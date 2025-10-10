'use client';

import React, { useEffect, useState } from 'react';
import { useToast } from '@/components/hooks/use-toast';
import DynamicForm, {FieldConfig} from './DynamicForm';
import CoursePrimaryFormFields from './FormFields/CoursePrimaryFormFields';
import { useRouter } from 'next/navigation';
// import { pushToDataLayer } from '@/lib/gtm';
import { getUTMTrackingData } from '../utils/getUTMTrackingData';
import { getGaCookieValue } from '../utils/cookieUtils';
import { fetchUserLocation } from '../utils/fetchUserLocation';
import { getOriginalTrafficSource } from '../utils/getOriginalTrafficSource';
interface PrimaryFormProps {
  slug: string;
  isModal: Boolean;
  buttonText?: string;
  isCoupon?: Boolean;
  sourceDomain?: string;
  foldName?: string;
  isCustomRedirect?: string;
  Version?: string;
  closeDialog?: () => void;
}

const getSlug = (slug: string) => {
  switch (slug) {
    case 'data-science-course': return 'Data Science Course';
    case 'data-science-elite-course': return 'Data Science Elite Course';
    case 'generative-ai-bootcamp': return 'Generative AI Course';
    case 'generative-ai-course-iitg': return 'Certification Program in Applied Generative AI';
    case 'investment-banking-course':
    case 'investment-banking-course-for-finance-graduates': return 'Investment Banking Course';
    // case 'power-bi-certification-course': return 'Power BI Course';
    case 'ai-course-with-machine-learning':
    case 'ai-course-with-machine-learning-for-graduates': return 'AI Course With Machine Learning';
    default: return slug;
  }
};

const PrimaryForm: React.FC<PrimaryFormProps> = ({
  slug,
  isModal,
  buttonText,
  isCoupon,
  sourceDomain,
  foldName,
  isCustomRedirect,
  closeDialog,
  Version,
}) => {
  const { toast } = useToast();

  const [utm, setUtm] = useState<Record<string, string>>({});
  const [GaClientId, setGaClientId] = useState('');
  const [isRedirectedByAimlPage, setIsRedirectedByAimlPage] = useState<string | null>(null);
  const router = useRouter();
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const getAccessToken = async () => {
    const res = await fetch('/api/auth/course-form-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('Failed to get access token');
    const data = await res.json();
    return data.access_token;
  };

  const getLocation = async () => {
    const location = await fetchUserLocation();
    setCity(location.city);
    setState(location.region);
  };

  useEffect(() => {
    const data = getUTMTrackingData();
    setUtm(data);

    getLocation();
    const gaValue = getGaCookieValue();
    setGaClientId(gaValue);
    setIsRedirectedByAimlPage(sessionStorage.getItem('isRedirectedByGenAiIitg'));
  }, [slug, foldName]);

  const handleFormSubmit = async (data: any, reset: () => void) => {
    // Total Form Submits (across all programs)
    let totalFormSubmits = Number(localStorage.getItem('total_form_submits') || '0');
    totalFormSubmits += 1;
    localStorage.setItem('total_form_submits', totalFormSubmits.toString());

    if (data.email) {
      localStorage.setItem('submittedEmail', data.email);
      sessionStorage.setItem('submittedEmail', data.email);
    }

    try {
      const token = await getAccessToken();
      const formData = new FormData();

      const countryCode = (data.countryCodeValue || '').split(' ')[0];
      const fullPhoneNumber = countryCode + (data.phone || '');

      formData.append('accessToken', token);
      formData.append('First Name', data.firstName);
      formData.append('Last Name', data.lastName);
      formData.append('Email', data.email);
      formData.append('Phone', fullPhoneNumber);
      formData.append('Program', getSlug(slug));
      formData.append('Year of Graduation', data.year);
      formData.append('Work Experience Level', data.experience);
      formData.append('Country', data.countryCode);
      formData.append('Ga_client_id', GaClientId);
      formData.append('Business Unit', 'Odinschool');
      formData.append('Source_Domain', sourceDomain ?? 'GC Course Form');
      // formData.append('Device_Type1', device);

      // user location open
      formData.append('Other_City', city);
      formData.append('Other_State', state);
      // user location close

      if (isRedirectedByAimlPage) formData.append('Description', 'GenAi Fold');
      slug === 'investment-banking-course'
        ? formData.append('intrested', data.isIntrested)
        : formData.append('intrested', '');
      if (isCoupon) formData.append('Coupon Code', 'EBO2025');
      formData.append('First Page Seen', utm['First Page Seen'] ?? '');
      formData.append('Original Traffic Source', getOriginalTrafficSource(utm));
      formData.append('Original Traffic Source Drill-Down 1', utm['Original Traffic Source Drill-Down 1'] ?? '');
      formData.append('Original Traffic Source Drill-Down 2', utm['Original Traffic Source Drill-Down 2'] ?? '');
      formData.append('UTM Term-First Page Seen', utm['UTM Term-First Page Seen'] ?? '');
      formData.append('UTM Content-First Page Seen', utm['UTM Content-First Page Seen'] ?? '');
      formData.append('ads_gclid', utm['ads_gclid'] ?? '');

      // --- Add Total Form Submits as pure number ---
      formData.append('Total Form Submits', totalFormSubmits.toString());

      const res = await fetch('/api/zoho/course-form', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Form submission failed' }));
        throw new Error(err.error ?? 'Form submission failed');
      }

      toast({
        title: 'Success!',
        description: "Your information has been submitted successfully. We'll contact you soon.",
      });

      // pushToDataLayer('form_submission', {
      //   eventName: 'form_submission',
      //   program_name: getSlug(slug),
      //   user_email: data.email,
      // });

      if (closeDialog) closeDialog();

      sessionStorage.setItem('first_name', data.firstName);
      sessionStorage.setItem('last_name', data.lastName);
      sessionStorage.setItem('phone', data.phone);

      reset();

      if (
        (slug === 'data-science-course' || slug === 'data-science-elite-course') &&
        (data.year === '2025' || data.year === 'After 2025')
      ) {
        if (isCustomRedirect) {
          router.push(isCustomRedirect);
        } else {
          router.push(`/thank-you-fresh-graduates?course=${slug}`);
        }
      } else {
        if (isCustomRedirect) {
          setTimeout(() => router.push(isCustomRedirect), 1000);
        } else {
          setTimeout(() => router.push(`/thank-you?title=${slug}`), 1000);
        }
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Submission failed', type: 'error',  });
    }
  };

  if (!Object.keys(utm).length) return null;

  return (
    <div className={`${isModal ? '' : 'w-full max-w-lg mx-auto bg-white text-black rounded-xl p-6 md:p-8 shadow-lg primaryFormCustom'}`}>
      <DynamicForm
        fields={[
          ...CoursePrimaryFormFields,
          {
            name: 'isIntrested',
            label: 'I am interested in enrolling for the Investment Banking and Financial Operations course',
            type: slug === 'investment-banking-course' ? 'checkbox' : 'hidden',
            required: true,
            rules: { required: 'This field is required' },
          },
        ]}
        buttonText={buttonText ?? 'Submit'}
        initialValues={{
          program: getSlug(slug),
          ga_client_id: '',
          business_unit: 'Odinschool',
        }}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default PrimaryForm;