'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useToast } from '@/components/hooks/use-toast';
import { getUTMTrackingData } from './utils/getUTMTrackingData';
import { getGaCookieValue } from './utils/cookieUtils';
import { fetchUserLocation } from './utils/fetchUserLocation';
import { getOriginalTrafficSource } from './utils/getOriginalTrafficSource';
import { CountryCodeData } from './data/CountryCodeData';
import { useRouter } from 'next/navigation';
import ReCAPTCHA from 'react-google-recaptcha';
import Link from 'next/link';
import { openZohoChatbot } from './utils/openZohoChatbot';

interface IBFOFormProps {
  isModal?: boolean;
  onClose?: () => void;
}

const IBFOForm: React.FC<IBFOFormProps> = ({ isModal = false, onClose }) => {
  const { toast } = useToast();
  const router = useRouter();
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const [utm, setUtm] = useState<Record<string, string>>({});
  const [gaClientId, setGaClientId] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const [countrySearch, setCountrySearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(CountryCodeData);
  const [selectedCountry, setSelectedCountry] = useState({
    country: 'India',
    code: '91',
  });
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setUtm(getUTMTrackingData());
    setGaClientId(getGaCookieValue() || '');
    fetchUserLocation().then((loc) => {
      setCity(loc.city);
      setState(loc.region);
    });
  }, []);

  useEffect(() => {
    if (countrySearch.trim() === '') {
      setFilteredCountries(CountryCodeData);
    } else {
      setFilteredCountries(
        CountryCodeData.filter((c) =>
          c.country.toLowerCase().startsWith(countrySearch.toLowerCase())
        )
      );
    }
  }, [countrySearch]);

  const getAccessToken = async () => {
    const res = await fetch('/api/auth/course-form-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to get access token');
    const data = await res.json();
    return data.access_token;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement; // ✅ capture form before any await
    setLoading(true);

    try {
      if (!captchaToken) {
        toast({
          title: 'Verification Required',
          description: 'Please complete the reCAPTCHA verification.',
          type: 'error',
        });
        setLoading(false);
        return;
      }

      // ✅ Verify reCAPTCHA server-side
      const verifyRes = await fetch('/api/verify-recaptcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: captchaToken }),
      });

      if (!verifyRes.ok) {
        throw new Error('ReCAPTCHA verification request failed.');
      }

      const verifyData = await verifyRes.json();
      console.log('reCAPTCHA verify response:', verifyData); // 🧠 Debug
      if (!verifyData.success) {
        toast({
          title: 'reCAPTCHA Failed',
          description: 'Please try again to verify you are not a robot.',
          type: 'error',
        });
        recaptchaRef.current?.reset();
        setLoading(false);
        return;
      }

      // ✅ Track total submissions
      let totalFormSubmits = Number(localStorage.getItem('total_form_submits') || '0');
      totalFormSubmits += 1;
      localStorage.setItem('total_form_submits', totalFormSubmits.toString());

      const formData = new FormData(form);

      // Email tracking
      const email = formData.get('Email') as string;
      if (email) {
        localStorage.setItem('submittedEmail', email);
        sessionStorage.setItem('submittedEmail', email);
      }

      // Phone formatting
      const phone = (formData.get('Phone') as string)?.trim();
      const fullPhone = `+${selectedCountry.code}${phone}`;
      formData.delete('Phone');
      formData.append('Phone', fullPhone);
      formData.append('Country', selectedCountry.country);

      // Add metadata
      const token = await getAccessToken();
      formData.append('accessToken', token);
      formData.append('Program', 'GC Investment Banking Bootcamp');
      formData.append('Ga_client_id', gaClientId);
      formData.append('Business Unit', 'Greycampus');
      formData.append('Source_Domain', isModal ? 'GC Brochure Form' : 'GC Course Form');
      formData.append('Other_City', city);
      formData.append('Other_State', state);
      formData.append('First Page Seen', utm['First Page Seen'] ?? '');
      formData.append('Original Traffic Source', getOriginalTrafficSource(utm));
      formData.append('Original Traffic Source Drill-Down 1', utm['Original Traffic Source Drill-Down 1'] ?? '');
      formData.append('Original Traffic Source Drill-Down 2', utm['Original Traffic Source Drill-Down 2'] ?? '');
      formData.append('UTM Term-First Page Seen', utm['UTM Term-First Page Seen'] ?? '');
      formData.append('UTM Content-First Page Seen', utm['UTM Content-First Page Seen'] ?? '');
      formData.append('ads_gclid', utm['ads_gclid'] ?? '');
      formData.append('Total Form Submits', totalFormSubmits.toString());

      // ✅ NEW FEATURE: Save submitted data to localStorage for Checkout Prefill
      const prefillData = {
        firstName: formData.get('First Name') as string,
        lastName: formData.get('Last Name') as string,
        email: email,
        phone: phone,
        year: formData.get('Year of Graduation') as string,
        workExp: formData.get('Work Experience Level') as string,
        country: selectedCountry.country,
        program: 'GC Investment Banking Bootcamp',
      };
      localStorage.setItem('checkoutPrefill', JSON.stringify(prefillData));
      console.log('💾 Saved prefill data to localStorage:', prefillData);

      // ✅ Submit to Zoho API
      const res = await fetch('/api/zoho/course-form', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.error || 'Submission failed');
      }

      toast({
        title: 'Success!',
        description: 'Thankyou for submitting the form',
      });

      // Track lead conversion (Facebook Pixel)
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead');
      }

      // ✅ If modal form → open brochure
      if (isModal) {
        const brochurePath = '/GC - Investment Banking & Finance Operations.pdf';
        window.open(brochurePath, '_blank');
        onClose?.();
      }

      // ✅ Reset form and captcha
      form.reset();
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
      setCountrySearch(selectedCountry.country);

      // ✅ Redirect to checkout (after saving prefill data)
      if (!isModal) {
        // router.push('/course-checkout/investment-banking-bootcamp');
        openZohoChatbot()
      }
    } catch (err: any) {
      console.error('Zoho form submission error:', err);
      toast({
        title: 'Error',
        description: err.message || 'Failed to submit the form',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={`${isModal ? 'shadow-none' : 'bg-white shadow-lg rounded-2xl p-6 sm:p-8'}`}>
      <CardContent className="p-0">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input name="First Name" placeholder="First Name" required />
            <Input name="Last Name" placeholder="Last Name" required />
          </div>

          <Input name="Email" placeholder="you@example.com" type="email" required />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search Country"
                value={countrySearch || selectedCountry.country}
                onChange={(e) => {
                  setCountrySearch(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
              />
              {showDropdown && (
                <ul className="absolute z-50 bg-white border border-gray-200 rounded-md mt-1 w-full max-h-48 overflow-y-auto shadow-lg">
                  {filteredCountries.map((c) => (
                    <li
                      key={c.id}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setSelectedCountry({ country: c.country, code: c.code });
                        setCountrySearch(c.country);
                        setShowDropdown(false);
                      }}
                    >
                      {c.country} (+{c.code})
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Input name="Phone" placeholder={`+${selectedCountry.code} 99999 99999`} required />
          </div>

          <select name="Year of Graduation" className="w-full border border-gray-300 rounded-md p-2" required>
            <option value="">Select Year of Graduation</option>
            {['Before 2018', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', 'After 2025'].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <select name="Work Experience Level" className="w-full border border-gray-300 rounded-md p-2" required>
            <option value="">Select Work Experience Level</option>
            <option value="Fresher">Fresher</option>
            <option value="1-3 Years">1-3 Years</option>
            <option value="3-5 Years">3-5 Years</option>
            <option value="5+ Years">5+ Years</option>
          </select>

          {/* ✅ reCAPTCHA widget */}
          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              ref={recaptchaRef}
              onChange={(token) => setCaptchaToken(token)}
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-green hover:bg-primary-green text-white font-semibold py-3 rounded-lg mt-2 cursor-pointer"
          >
            {loading ? 'Submitting...' : isModal ? 'Request More Information' : 'Talk to us'}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            By providing your contact details, you agree to our{' '}
            <Link href="/privacyPolicy" className="text-primary-green hover:underline">
              Privacy Policy
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default IBFOForm;
