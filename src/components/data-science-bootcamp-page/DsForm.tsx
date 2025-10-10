'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Portal } from '@radix-ui/react-select';
import { useToast } from '@/components/hooks/use-toast';
import { getUTMTrackingData } from '../utils/getUTMTrackingData';
import { getGaCookieValue } from '../utils/cookieUtils';
import { fetchUserLocation } from '../utils/fetchUserLocation';
import { getOriginalTrafficSource } from '../utils/getOriginalTrafficSource';

const DsForm = () => {
  const { toast } = useToast();
  const [utm, setUtm] = useState<Record<string, string>>({});
  const [gaClientId, setGaClientId] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);

  // 🧩 Fetch UTM, GA, and location data on mount
  useEffect(() => {
    setUtm(getUTMTrackingData());
    setGaClientId(getGaCookieValue());
    fetchUserLocation().then((loc) => {
      setCity(loc.city);
      setState(loc.region);
    });
  }, []);

  // 🧠 Fetch Zoho Access Token
  const getAccessToken = async () => {
    const res = await fetch('/api/auth/course-form-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to get access token');
    const data = await res.json();
    return data.access_token;
  };

  // 🧩 Handle Form Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const token = await getAccessToken();

      // Append additional tracking & metadata
      formData.append('accessToken', token);
      formData.append('Program', 'Data Science Bootcamp');
      formData.append('Ga_client_id', gaClientId);
      formData.append('Business Unit', 'Greycampus');
      formData.append('Source_Domain', 'GC Course Form');
      formData.append('Other_City', city);
      formData.append('Other_State', state);

      // Tracking fields
      formData.append('First Page Seen', utm['First Page Seen'] ?? '');
      formData.append('Original Traffic Source', getOriginalTrafficSource(utm));
      formData.append('Original Traffic Source Drill-Down 1', utm['Original Traffic Source Drill-Down 1'] ?? '');
      formData.append('Original Traffic Source Drill-Down 2', utm['Original Traffic Source Drill-Down 2'] ?? '');
      formData.append('UTM Term-First Page Seen', utm['UTM Term-First Page Seen'] ?? '');
      formData.append('UTM Content-First Page Seen', utm['UTM Content-First Page Seen'] ?? '');
      formData.append('ads_gclid', utm['ads_gclid'] ?? '');
      formData.append(
        'Total Form Submits',
        (Number(localStorage.getItem('total_form_submits') || 0) + 1).toString()
      );

      // 🚀 Post data to Zoho CRM
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
        description: "Your details have been submitted successfully. Our team will get in touch soon!",
      });

      // Reset form + counter
      form.reset();
      localStorage.setItem(
        'total_form_submits',
        (Number(localStorage.getItem('total_form_submits') || 0) + 1).toString()
      );
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
    <Card className="bg-white shadow-lg rounded-2xl p-6 sm:p-8">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input name="Country" placeholder="India" required />
            <Input name="Phone" placeholder="+91 99999 99999" required />
          </div>

          {/* Year of Graduation */}
          <Select name="Year of Graduation">
            <SelectTrigger className="relative z-20">
              <SelectValue placeholder="Select Year of Graduation" />
            </SelectTrigger>
            <Portal>
              <SelectContent className="z-[9999] bg-white border border-gray-200 shadow-lg rounded-md">
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="Before 2023">Before 2023</SelectItem>
              </SelectContent>
            </Portal>
          </Select>

          {/* Work Experience */}
          <Select name="Work Experience Level">
            <SelectTrigger className="relative z-20">
              <SelectValue placeholder="Select Work Experience Level" />
            </SelectTrigger>
            <Portal>
              <SelectContent className="z-[9999] bg-white border border-gray-200 shadow-lg rounded-md">
                <SelectItem value="Fresher">Fresher</SelectItem>
                <SelectItem value="1-3 Years">1-3 Years</SelectItem>
                <SelectItem value="3-5 Years">3-5 Years</SelectItem>
                <SelectItem value="5+ Years">5+ Years</SelectItem>
              </SelectContent>
            </Portal>
          </Select>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary-green hover:bg-primary-green text-white font-semibold py-3 rounded-lg mt-2"
          >
            {loading ? 'Submitting...' : 'Request a Callback'}
          </Button>

          {/* Privacy Note */}
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
