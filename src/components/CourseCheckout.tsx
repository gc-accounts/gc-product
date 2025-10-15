'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, ChevronLeft } from 'lucide-react';
import { useToast } from '@/components/hooks/use-toast';
import { useRouter, usePathname } from 'next/navigation';

import { getUTMTrackingData } from './utils/getUTMTrackingData';
import DynamicForm from './forms/DynamicForm';
import checkoutFormFields from './forms/FormFields/checkoutFormFields';
import { getGaCookieValue } from './utils/cookieUtils';
import { getOriginalTrafficSource } from './utils/getOriginalTrafficSource';
import { getDeviceType } from './utils/getDeviceType';
import { getUserCountry, PRICE_CONFIG } from '@/lib/country-detection';

import Navigation from './Navigation';
import Footer from './Footer';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  year: string;
  countryCodeValue: string;
  countryCode: string;
}

const CourseCheckout = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');
  const [utm, setUtm] = useState<Record<string, string>>({});
  const [GaClientId, setGaClientId] = useState<string>('');
  const [userCountry, setUserCountry] = useState<string>('IN');
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [basePrice, setBasePrice] = useState<number>(5000);
  const device = getDeviceType();

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
    setGaClientId(getGaCookieValue());
    fetchUserLocation();
    detectUserCountry();
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

  const detectUserCountry = async () => {
    try {
      const countryInfo = await getUserCountry();
      setUserCountry(countryInfo.country);
      setCurrency(countryInfo.currency);
      
      // Set price based on country
      if (countryInfo.isIndia) {
        setBasePrice(PRICE_CONFIG.INR.basePrice);
      } else {
        setBasePrice(PRICE_CONFIG.USD.basePrice);
      }
      
      console.log('🌍 Country detected:', countryInfo);
    } catch (error) {
      console.error('Country detection failed:', error);
      // Fallback to INR
      setUserCountry('IN');
      setCurrency('INR');
      setBasePrice(PRICE_CONFIG.INR.basePrice);
    }
  };

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

  const handleSubmit = async (formData: FormData) => {
    setSubmitting(true);
    try {
      const accessToken = await getAccessToken();

      const zohoFormData = new FormData();
      zohoFormData.append('accessToken', accessToken);
      zohoFormData.append('First_Name', formData.firstName);
      zohoFormData.append('Last_Name', formData.lastName);
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
      zohoFormData.append('Business_Unit', 'GreyCampus');
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
      });
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const handlePayment = async (formData: FormData) => {
    try {
      // Calculate amounts based on currency
      let gstAmount, totalAmount;
      
      if (currency === 'INR') {
        // For India: Apply GST
        gstAmount = basePrice * GST_RATE;
        totalAmount = basePrice + gstAmount;
      } else {
        // For international: No GST, use base price directly
        gstAmount = 0;
        totalAmount = basePrice;
      }

      // Create PayU order
      const payuOrderRes = await fetch('/api/payment/create-payu-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalAmount,
          email: formData.email,
          txnId: `TXN${Date.now()}`,
          productName: getProgramName(),
          firstName: formData.firstName,
          phone: formData.phone,
          userCountry: userCountry, // Pass country to API
          currency: currency // Pass currency to API
        }),
      });

      if (!payuOrderRes.ok) {
        const errorData = await payuOrderRes.json();
        throw new Error(errorData.error || 'Failed to create PayU order');
      }

      const { action, params } = await payuOrderRes.json();

      // Create and submit form to redirect to PayU
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = action;

      // Add all parameters as hidden inputs
      Object.keys(params).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = params[key];
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();

    } catch (error) {
      console.error('PayU payment error:', error);
      toast({
        title: 'Payment Error',
        description: error instanceof Error 
          ? error.message 
          : 'Failed to initiate payment. Please try again.',
      });
    }
  };

  // Calculate display amounts
  const gstAmount = currency === 'INR' ? basePrice * GST_RATE : 0;
  const totalAmount = currency === 'INR' ? basePrice + gstAmount : basePrice;
  const currencySymbol = currency === 'INR' ? '₹' : '$';

  return (
    <>
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
                    <span>{currencySymbol}{basePrice}</span>
                  </div>
                  
                  {currency === 'INR' && (
                    <>
                      <div className='flex justify-between'>
                        <span>GST (18%)</span>
                        <span>{currencySymbol}{gstAmount.toFixed(2)}</span>
                      </div>
                      <hr />
                    </>
                  )}
                  
                  <div className='flex justify-between font-bold'>
                    <span>Total Amount</span>
                    <span>{currencySymbol}{totalAmount.toFixed(2)} {currency}</span>
                  </div>
                  
                  <div className="text-xs text-gray-500 mt-2">
                    {userCountry === 'IN' 
                      ? 'Inclusive of all taxes' 
                      : 'International pricing - no additional taxes'
                    }
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