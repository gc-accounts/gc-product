'use client';

import React, { useEffect, useState } from 'react';
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

interface DsFormProps {
  isModal?: boolean;
  onClose?: () => void; // optional callback for modal close
}

const DsForm: React.FC<DsFormProps> = ({ isModal = false, onClose }) => {
  const { toast } = useToast();
  const router = useRouter();

  const [utm, setUtm] = useState<Record<string, string>>({});
  const [gaClientId, setGaClientId] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);

  // Country selector
  const [countrySearch, setCountrySearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState(CountryCodeData);
  const [selectedCountry, setSelectedCountry] = useState({
    country: 'India',
    code: '91',
  });
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch UTM, GA, and location data
  useEffect(() => {
    setUtm(getUTMTrackingData());
    setGaClientId(getGaCookieValue());
    fetchUserLocation().then((loc) => {
      setCity(loc.city);
      setState(loc.region);
    });
  }, []);

  // Filter countries on search
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

  // Fetch Zoho Access Token
  const getAccessToken = async () => {
    const res = await fetch('/api/auth/course-form-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to get access token');
    const data = await res.json();
    return data.access_token;
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const phone = (formData.get('Phone') as string)?.trim();

    const fullPhone = `+${selectedCountry.code}${phone}`;
    formData.delete('Phone');
    formData.append('Phone', fullPhone);

    try {
      const token = await getAccessToken();

      // Append additional tracking fields
      formData.append('accessToken', token);
      formData.append('Program', 'GC Data Science Bootcamp');
      formData.append('Ga_client_id', gaClientId);
      formData.append('Business Unit', 'Greycampus');
      formData.append('Source_Domain', isModal ? 'GC Brochure Form' : 'GC Course Form');
      formData.append('Other_City', city);
      formData.append('Other_State', state);
      formData.append('Country', selectedCountry.country);
      formData.append('First Page Seen', utm['First Page Seen'] ?? '');
      formData.append('Original Traffic Source', getOriginalTrafficSource(utm));
      formData.append(
        'Original Traffic Source Drill-Down 1',
        utm['Original Traffic Source Drill-Down 1'] ?? ''
      );
      formData.append(
        'Original Traffic Source Drill-Down 2',
        utm['Original Traffic Source Drill-Down 2'] ?? ''
      );
      formData.append('UTM Term-First Page Seen', utm['UTM Term-First Page Seen'] ?? '');
      formData.append('UTM Content-First Page Seen', utm['UTM Content-First Page Seen'] ?? '');
      formData.append('ads_gclid', utm['ads_gclid'] ?? '');

      const res = await fetch('/api/zoho/course-form', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Submission failed');
      }

      // ✅ Success Toast
      toast({
        title: 'Success!',
        description: 'Your details have been submitted successfully. Our team will get in touch soon!',
      });

      // ✅ Modal case: open PDF & close dialog
      if (isModal) {
        const brochurePath = '/Data Science Bootcamp - GC (3) (1).pdf'; // from /public
        window.open(brochurePath, '_blank');

        // Optional close (if passed from Dialog)
        if (onClose) onClose();
      }

      // Reset form
      form.reset();
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

          {/* Country + Phone */}
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

            {/* Phone input */}
            <Input
              name="Phone"
              placeholder={`+${selectedCountry.code} 99999 99999`}
              required
            />
          </div>

          {/* Year of Graduation */}
          <select
            name="Year of Graduation"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="">Select Year of Graduation</option>
            <option value="Before 2018">Before 2018</option>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="After 2025">After 2025</option>
          </select>

          {/* Work Experience */}
          <select
            name="Work Experience Level"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="">Select Work Experience Level</option>
            <option value="Fresher">Fresher</option>
            <option value="1-3 Years">1-3 Years</option>
            <option value="3-5 Years">3-5 Years</option>
            <option value="5+ Years">5+ Years</option>
          </select>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary-green hover:bg-primary-green text-white font-semibold py-3 rounded-lg mt-2"
          >
            {loading ? 'Submitting...' : 'Request a Callback'}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            By providing your contact details, you agree to our{' '}
            <a href="#" className="text-primary-green hover:underline">
              Privacy Policy
            </a>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default DsForm;
