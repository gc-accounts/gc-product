'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, ChevronLeft } from 'lucide-react';
import Script from 'next/script';
import { useToast } from '@/components/hooks/use-toast';
import { useRouter, usePathname } from 'next/navigation';

import { getUTMTrackingData } from './utils/getUTMTrackingData';
import DynamicForm from './forms/DynamicForm';
import checkoutFormFields from './forms/FormFields/checkoutFormFields';
import { getGaCookieValue } from './utils/cookieUtils';
import { getOriginalTrafficSource } from './utils/getOriginalTrafficSource';

import Navigation from './Navigation';
import Footer from './Footer';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  year: string;
  countryCodeValue: string;
  countryCode: string;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

const CourseCheckout = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');
  const [utm, setUtm] = useState<Record<string, string>>({});
  const [GaClientId, setGaClientId] = useState<string>('');

  const BASE_PRICE = 5000; // ₹5,000
  const GST_RATE = 0.18;

  // ✅ Dynamically detect program name based on URL
  const getProgramName = () => {
    if (pathname.includes('data-science-bootcamp')) return 'Data Science Bootcamp';
    if (pathname.includes('data-analyst-bootcamp-page')) return 'Data Analytics Bootcamp';
    if (pathname.includes('aiml-bootcamp-page')) return 'AIML Bootcamp';
    return 'Static Product Checkout';
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const data = getUTMTrackingData();
    setUtm(data);
    setGaClientId(getGaCookieValue());
    fetchUserLocation();
  }, []);

  const fetchUserLocation = async () => {
    try {
      const res = await fetch('https://ipinfo.io/json?token=2ba7c468fe54ad');
      const data = await res.json();
      setCurrentLocation(data?.region);
    } catch (error) {
      console.log('Error fetching user location', error);
    }
  };

  useEffect(() => {
    const loadRazorpay = () => {
      return new Promise((resolve, reject) => {
        if (window.Razorpay) {
          setIsRazorpayLoaded(true);
          resolve(window.Razorpay);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => {
          setIsRazorpayLoaded(true);
          resolve(window.Razorpay);
        };
        script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
        document.body.appendChild(script);
      });
    };

    loadRazorpay().catch((error) => {
      console.error('Error loading Razorpay:', error);
      toast({
        title: 'Error',
        description: 'Failed to load payment system. Please refresh the page.',
        variant: 'destructive',
      });
    });
  }, [toast]);

  const getAccessToken = async () => {
    const res = await fetch('/api/auth/token-checkout', { method: 'POST' });
    const data = await res.json();
    return data.access_token;
  };

  const handleSubmit = async (formData: FormData) => {
    setSubmitting(true);
    try {
      const accessToken = await getAccessToken();

      const zohoFormData = new FormData();
      zohoFormData.append('accessToken', accessToken);
      zohoFormData.append('First Name', formData.firstName);
      zohoFormData.append('Last Name', formData.lastName);
      zohoFormData.append('Email', formData.email);

      const countryCodePrefix = formData.countryCodeValue
        ? formData.countryCodeValue.split(' ')[0]
        : '';
      const fullPhone = countryCodePrefix + formData.phone;
      zohoFormData.append('Phone', fullPhone);

      // ✅ Dynamically set program based on URL
      zohoFormData.append('Program', getProgramName());

      zohoFormData.append('Business Unit', 'Odinschool');
      zohoFormData.append('Ga_client_id', GaClientId);
      zohoFormData.append('Original Traffic Source', getOriginalTrafficSource(utm));

      // ✅ UTM data
      zohoFormData.append('First Page Seen', utm['First Page Seen'] || '');
      zohoFormData.append(
        'Original Traffic Source Drill-Down 1',
        utm['Original Traffic Source Drill-Down 1'] || ''
      );
      zohoFormData.append(
        'Original Traffic Source Drill-Down 2',
        utm['Original Traffic Source Drill-Down 2'] || ''
      );
      zohoFormData.append(
        'UTM Term-First Page Seen',
        utm['UTM Term-First Page Seen'] || ''
      );
      zohoFormData.append(
        'UTM Content-First Page Seen',
        utm['UTM Content-First Page Seen'] || ''
      );
      zohoFormData.append('ads_gclid', utm['ads_gclid'] || '');

      await fetch('/api/zoho/checkout-form', { method: 'POST', body: zohoFormData });

      toast({
        title: 'Registration successful!',
        description: 'Proceed to payment to confirm your registration.',
      });

      await handlePayment(formData);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'There was a problem submitting your details.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handlePayment = async (formData: FormData) => {
    try {
      const gstAmount = BASE_PRICE * GST_RATE;
      const totalAmount = BASE_PRICE + gstAmount;

      const orderRes = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount }),
      });

      const { orderId } = await orderRes.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
        amount: Math.round(totalAmount * 100),
        currency: 'INR',
        name: 'OdinSchool',
        description: getProgramName(),
        order_id: orderId,
        handler: async (response: RazorpayResponse) => {
          const verifyRes = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...response,
              razorpay_amount: totalAmount,
            }),
          });

          const verifyData = await verifyRes.json();

          if (verifyData.status === 'success') {
            // ✅ Update Zoho with paid amount
            const accessToken = await getAccessToken();
            const paymentForm = new FormData();
            paymentForm.append('accessToken', accessToken);
            paymentForm.append('Email', formData.email);
            paymentForm.append('Program', getProgramName());
            paymentForm.append('Payable Amount', totalAmount.toString());
            paymentForm.append('Payment ID', verifyData.payment_id);

            await fetch('/api/zoho/checkout-form', {
              method: 'POST',
              body: paymentForm,
            });

            toast({
              title: 'Payment Successful!',
              description: 'Thank you for your purchase.',
            });
            // router.push('/thank-you-2');
          } else {
            toast({
              title: 'Payment Failed',
              description: 'Something went wrong verifying your payment.',
              variant: 'destructive',
            });
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: '#3399cc' },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Payment Error',
        description: 'Could not initialize payment. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const gstAmount = BASE_PRICE * GST_RATE;
  const totalAmount = BASE_PRICE + gstAmount;

  return (
    <>
      <Script src='https://checkout.razorpay.com/v1/checkout.js' strategy='lazyOnload' />
      <Navigation />
      <main className='min-h-screen bg-gray-50 py-12'>
        <div className='container mx-auto px-4'>
          <Button variant='outline' className='mb-6' asChild>
            <Link href='/' className='flex items-center'>
              <ChevronLeft className='mr-2 h-4 w-4' /> Back to Home
            </Link>
          </Button>

          <h1 className='text-3xl font-bold mb-8'>Checkout</h1>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            <div className='lg:col-span-2'>
              <div className='space-y-8 bg-white p-6 rounded-lg shadow-sm'>
                <div>
                  <h2 className='text-xl font-semibold mb-4'>Enter Your Details</h2>
                  <DynamicForm
                    fields={checkoutFormFields}
                    initialValues={{}}
                    onSubmit={handleSubmit}
                    buttonText={submitting ? 'Submitting...' : 'Submit'}
                  />
                  <p className='text-center text-sm text-gray-500 mt-4 flex items-center justify-center'>
                    <ShieldCheck className='h-4 w-4 mr-1' /> Secure registration process
                  </p>
                </div>
              </div>
            </div>

            <div>
              <Card>
                <CardHeader className='pb-3'>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <div className='flex justify-between'>
                    <span>Base Price</span>
                    <span>₹{BASE_PRICE}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>GST (18%)</span>
                    <span>₹{gstAmount}</span>
                  </div>
                  <hr />
                  <div className='flex justify-between font-bold'>
                    <span>Total</span>
                    <span>₹{totalAmount}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CourseCheckout;
