'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, ChevronLeft, Loader2 } from 'lucide-react';
import Script from 'next/script';
import { useToast } from '@/components/hooks/use-toast';
import { useRouter, usePathname } from 'next/navigation';

import { getUTMTrackingData } from './utils/getUTMTrackingData';
import DynamicForm from './forms/DynamicForm';
import checkoutFormFields from './forms/FormFields/checkoutFormFields';
import { getGaCookieValue } from './utils/cookieUtils';
import { getOriginalTrafficSource } from './utils/getOriginalTrafficSource';
// import { getDeviceType } from './utils/getDeviceType';
import { getDeviceType } from './utils/getDeviceType';


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
  const device = getDeviceType();

  const BASE_PRICE = 5000; // ₹5,000
  const GST_RATE = 0.18;

  // ✅ Dynamically detect program name based on URL
  const getProgramName = () => {
    if (pathname.includes('data-science-bootcamp')) return 'GC Data Science Bootcamp';
    if (pathname.includes('data-analyst-bootcamp')) return 'GC Data Analyst Bootcamp';
    if (pathname.includes('aiml-bootcamp')) return 'GC AI/ML Bootcamp';
    return 'Static Product Checkout';
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const data = getUTMTrackingData();
    setUtm(data);
    setGaClientId(getGaCookieValue() || '');
    fetchUserLocation();
  }, []);

  const fetchUserLocation = async () => {
    try {
      const res = await fetch('https://ipinfo.io/json?token=30d6ad207d1162');
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
        // variant: 'destructive',
      });
    });
  }, [toast]);

  // Get access token for initial form submission
  const getAccessToken = async () => {
    try {
      const res = await fetch('/api/auth/token-checkout', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Failed to get access token');
      const data = await res.json();
      return data.access_token;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  };

  // Get access token for payment status updates
  const getAccessTokenForPayment = async () => {
    try {
      const response = await fetch('/api/auth/token-payment-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get access token for payment');
      }

      const data = await response.json();
      if (data?.access_token) {
        return data.access_token;
      } else {
        throw new Error('No access token in response');
      }
    } catch (error) {
      console.error('Error refreshing token for payment:', error);
      throw error;
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setSubmitting(true);
    try {
      const accessToken = await getAccessToken();

      const zohoFormData = new FormData();
      zohoFormData.append('accessToken', accessToken);
      zohoFormData.append('First_Name', formData.firstName); // Fixed: Use First_Name instead of First Name
      zohoFormData.append('Last_Name', formData.lastName);   // Fixed: Use Last_Name instead of Last Name
      zohoFormData.append('Email', formData.email);

      const countryCodePrefix = formData.countryCodeValue
        ? formData.countryCodeValue.split(' ')[0]
        : '';
      const fullPhone = countryCodePrefix + formData.phone;
      zohoFormData.append('Phone', fullPhone);

      // ✅ Dynamically set program based on URL
      zohoFormData.append('Program', getProgramName());

      // Add additional required fields
      zohoFormData.append('Year_of_Graduation', formData.year || '');
      zohoFormData.append('Country', formData.countryCode || '');
      zohoFormData.append('Business_Unit', 'GreyCampus'); // Changed to GreyCampus
      zohoFormData.append('Ga_client_id', GaClientId);
      zohoFormData.append('Device_Type1', device);
      zohoFormData.append('Original_Traffic_Source', getOriginalTrafficSource(utm));

      // ✅ UTM data
      zohoFormData.append('First_Page_Seen', utm['First Page Seen'] || '');
      zohoFormData.append(
        'Original_Traffic_Source_Drill_Down_1',
        utm['Original Traffic Source Drill-Down 1'] || ''
      );
      zohoFormData.append(
        'Original_Traffic_Source_Drill_Down_2',
        utm['Original Traffic Source Drill-Down 2'] || ''
      );
      zohoFormData.append(
        'UTM_Term_First_Page_Seen',
        utm['UTM Term-First Page Seen'] || ''
      );
      zohoFormData.append(
        'UTM_Content_First_Page_Seen',
        utm['UTM Content-First Page Seen'] || ''
      );
      zohoFormData.append('ads_gclid', utm['ads_gclid'] || '');

      const contactResponse = await fetch('/api/zoho/checkout-form', { 
        method: 'POST', 
        body: zohoFormData 
      });

      if (!contactResponse.ok) {
        const errorData = await contactResponse.json();
        console.error('Zoho API error:', errorData);
        throw new Error(errorData.error || 'Failed to create contact in Zoho');
      }

      const contactData = await contactResponse.json();

      if (contactData?.data?.[0]?.status === 'success') {
        toast({
          title: 'Registration successful!',
          description: 'Please complete the payment to secure your seat.',
        });

        await handlePayment(formData);
      } else {
        throw new Error('Failed to create contact in CRM');
      }
    } catch (error) {
      console.error('Error in registration process:', error);
      toast({
        title: 'Registration failed',
        description: error instanceof Error 
          ? error.message 
          : 'There was an error processing your registration. Please try again.',
        // variant: 'destructive',
      });
      throw error;
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

      if (!orderRes.ok) {
        const errorData = await orderRes.json();
        throw new Error(errorData.details || 'Failed to create payment order');
      }

      const { orderId } = await orderRes.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
        amount: Math.round(totalAmount * 100),
        currency: 'INR',
        name: 'GreyCampus',
        description: getProgramName(),
        image: '/logo.png', // Add your logo
        order_id: orderId,
        handler: async (response: RazorpayResponse) => {
          try {
            const verifyRes = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                razorpay_amount: totalAmount,
              }),
            });

            const verifyData = await verifyRes.json();

            // ✅ CRITICAL: Update payment status in Zoho after successful payment
            if (verifyData.status === 'success' || verifyData.response === 'success') {
              const accessToken2 = await getAccessTokenForPayment();
              
              const zohoPaymentFormData = new FormData();
              zohoPaymentFormData.append('accessToken', accessToken2);
              zohoPaymentFormData.append('Email', formData.email);
              zohoPaymentFormData.append('Program', getProgramName());
              zohoPaymentFormData.append('Effective_Bootcamp_Fee', BASE_PRICE.toString());
              zohoPaymentFormData.append('Payment_Status', 'Paid');
              zohoPaymentFormData.append('Payable_Amount', totalAmount.toString());
              zohoPaymentFormData.append('Payment_ID', response.razorpay_payment_id);
              zohoPaymentFormData.append('Business_Unit', 'GreyCampus');
              zohoPaymentFormData.append('Ga_client_id', GaClientId);
              zohoPaymentFormData.append('Device_Type1', device);
              zohoPaymentFormData.append('Source_Domain', 'GC Checkout Form');

              // ✅ Make API call to update payment status
              await fetch('/api/zoho/payment-status', {
                method: 'POST',
                body: zohoPaymentFormData,
              });

              toast({
                title: 'Payment Successful!',
                description: 'Thank you for your purchase. Your enrollment is confirmed.',
              });
              
              // Redirect to thank you page
              // router.push('/thank-you');
            } else {
              // Update payment status as failed in Zoho
              const accessToken2 = await getAccessTokenForPayment();
              const zohoPaymentFormData = new FormData();
              zohoPaymentFormData.append('accessToken', accessToken2);
              zohoPaymentFormData.append('Email', formData.email);
              zohoPaymentFormData.append('Program', getProgramName());
              zohoPaymentFormData.append('Payment_Status', 'Failed');
              zohoPaymentFormData.append('Payable_Amount', totalAmount.toString());
              
              await fetch('/api/zoho/payment-status', {
                method: 'POST',
                body: zohoPaymentFormData,
              });

              toast({
                title: 'Payment Verification Failed',
                description: 'Please contact support for assistance.',
                // variant: 'destructive',
              });
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast({
              title: 'Payment Verification Error',
              description: 'There was an error verifying your payment. Please contact support.',
              // variant: 'destructive',
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
      
      razorpay.on('payment.failed', async function (response: any) {
        console.error('Payment failed:', response);
        
        // Update payment status as failed in Zoho
        try {
          const accessToken2 = await getAccessTokenForPayment();
          const zohoPaymentFormData = new FormData();
          zohoPaymentFormData.append('accessToken', accessToken2);
          zohoPaymentFormData.append('Email', formData.email);
          zohoPaymentFormData.append('Program', getProgramName());
          zohoPaymentFormData.append('Payment_Status', 'Failed');
          zohoPaymentFormData.append('Payable_Amount', totalAmount.toString());
          
          await fetch('/api/zoho/payment-status', {
            method: 'POST',
            body: zohoPaymentFormData,
          });
        } catch (error) {
          console.error('Error updating failed payment status:', error);
        }

        toast({
          title: 'Payment Failed',
          description: 'Your payment could not be processed. Please try again.',
          // variant: 'destructive',
        });
      });

      razorpay.open();
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: 'Payment Error',
        description: error instanceof Error 
          ? error.message 
          : 'Failed to initiate payment. Please try again.',
        // variant: 'destructive',
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
          <Button variant='outline' className='my-10' asChild>
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
                    buttonText={submitting ? 'Submitting...' : 'Submit & Proceed to Payment'}
                    // disabled={submitting}
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
                    <span>Program Fee</span>
                    <span>₹{BASE_PRICE}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span>GST (18%)</span>
                    <span>₹{gstAmount.toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className='flex justify-between font-bold'>
                    <span>Total Amount</span>
                    <span>₹{totalAmount.toFixed(2)}</span>
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