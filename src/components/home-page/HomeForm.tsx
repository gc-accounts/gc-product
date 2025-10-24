'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useToast } from '@/components/hooks/use-toast';
import { getUTMTrackingData } from '../utils/getUTMTrackingData';
import { getGaCookieValue } from '../utils/cookieUtils';
import { fetchUserLocation } from '../utils/fetchUserLocation';
import { getOriginalTrafficSource } from '../utils/getOriginalTrafficSource';
import { CountryCodeData } from '../data/CountryCodeData';
import ReCAPTCHA from 'react-google-recaptcha';
import Link from 'next/link';

interface FormProps {
  isModal?: boolean;
  onClose?: () => void;
}

const HomeForm: React.FC<FormProps> = ({ isModal = false, onClose }) => {
  const { toast } = useToast();
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const [utm, setUtm] = useState<Record<string, string>>({});
  const [gaClientId, setGaClientId] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const [countrySearch, setCountrySearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(CountryCodeData);
  const [selectedCountry, setSelectedCountry] = useState({ country: 'India', code: '91' });
  const [showDropdown, setShowDropdown] = useState(false);
  const [phone, setPhone] = useState('');

  // Fetch UTM, GA, and location info
  useEffect(() => {
    setUtm(getUTMTrackingData());
    setGaClientId(getGaCookieValue() || '');
    fetchUserLocation().then((loc) => {
      setCity(loc.city);
      setState(loc.region);
      // Auto-select country if available
      if (loc.country) {
        const match = CountryCodeData.find(
          (c) => c.country.toLowerCase() === loc.country.toLowerCase()
        );
        if (match) setSelectedCountry({ country: match.country, code: match.code });
      }
    });
  }, []);

  // Filter country list
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
    const form = e.currentTarget as HTMLFormElement;
    setLoading(true);

    try {
      // ✅ Check if reCAPTCHA is completed
      if (!captchaToken) {
        toast({
          title: 'Verification Required',
          description: 'Please complete the reCAPTCHA verification.',
          type: 'error',
        });
        setLoading(false);
        return;
      }

      // ✅ Verify reCAPTCHA on server
      const verifyRes = await fetch('/api/verify-recaptcha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: captchaToken }),
      });
      const verifyData = await verifyRes.json();

      if (!verifyData.success) {
        toast({
          title: 'reCAPTCHA Failed',
          description: 'Please verify you are not a robot.',
          type: 'error',
        });
        recaptchaRef.current?.reset();
        setCaptchaToken(null);
        setLoading(false);
        return;
      }

      // ✅ Track total submissions
      let totalFormSubmits = Number(localStorage.getItem('total_form_submits') || '0') + 1;
      localStorage.setItem('total_form_submits', totalFormSubmits.toString());

      const formData = new FormData(form);

      const email = formData.get('Email') as string;
      if (email) {
        localStorage.setItem('submittedEmail', email);
        sessionStorage.setItem('submittedEmail', email);
      }

      // ✅ Format phone with country code
      const fullPhone = `+${selectedCountry.code}${phone.trim()}`;
      formData.delete('Phone');
      formData.append('Phone', fullPhone);
      formData.append('Country', selectedCountry.country);

      // ✅ Append tracking fields
      const token = await getAccessToken();
      formData.append('accessToken', token);
      formData.append('Ga_client_id', gaClientId);
      formData.append('Business Unit', 'Greycampus');
      formData.append('Source_Domain', isModal ? 'GC Home Brochure Form' : 'GC Home Form');
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

      // ✅ Submit to Zoho API
      const res = await fetch('/api/zoho/home-form', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Submission failed');
      }

      toast({
        title: 'Success!',
        description: 'Your details have been submitted successfully. Our team will contact you soon!',
      });

      if (isModal) {
        const brochurePath = '/GreyCampus-programs.pdf';
        window.open(brochurePath, '_blank');
        onClose?.();
      }

      form.reset();
      setPhone('');
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
      setCountrySearch(selectedCountry.country);
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
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input name="First Name" placeholder="First Name" required />
            <Input name="Last Name" placeholder="Last Name" required />
          </div>

          {/* Email */}
          <Input name="Email" placeholder="you@example.com" type="email" required />

          {/* Country Code Picker + Phone */}
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
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                autoComplete="off"
                required
              />
              {showDropdown && (
                <ul className="absolute z-50 bg-white border border-gray-200 rounded-md mt-1 w-full max-h-48 overflow-y-auto shadow-lg">
                  {filteredCountries.map((c) => (
                    <li
                      key={c.id}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      onMouseDown={() => {
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

            <Input
              name="Phone"
              placeholder={`+${selectedCountry.code} 99999 99999`}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* Title */}
          <Input name="Title" placeholder="Designation/Title" required />

          {/* College Name */}
          <Input name="College Name" placeholder="University/College Name" required />

          {/* City */}
          <Input name="Other City" placeholder="Location" required />

          {/* ✅ reCAPTCHA */}
          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              ref={recaptchaRef}
              onChange={(token) => setCaptchaToken(token)}
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-green hover:bg-primary-green text-white font-semibold py-3 rounded-lg mt-2 cursor-pointer"
          >
            {loading ? 'Submitting...' : 'Request More Information'}
          </Button>

          {/* Privacy Note */}
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

export default HomeForm;
