'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { XCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/components/hooks/use-toast';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getApiUrl } from '@/lib/api';

export default function PaymentFailure() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [processing, setProcessing] = useState(true);

  // Get access token for payment status updates
  const getAccessTokenForPayment = async () => {
    try {
      const response = await fetch(getApiUrl('/api/auth/token-payment-status'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get access token for payment');
      }

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Error refreshing token for payment:', error);
      throw error;
    }
  };

  const updateZohoCRM = async (email: string) => {
    try {
      const accessToken = await getAccessTokenForPayment();
      
      const zohoPaymentFormData = new FormData();
      zohoPaymentFormData.append('accessToken', accessToken);
      zohoPaymentFormData.append('Email', email);
      zohoPaymentFormData.append('Program', 'GC Data Science Bootcamp');
      zohoPaymentFormData.append('Payment_Status', 'Failed');
      zohoPaymentFormData.append('Payable_Amount', '5900');
      zohoPaymentFormData.append('Effective_Bootcamp_Fee', '5000');
      zohoPaymentFormData.append('Business_Unit', 'GreyCampus');
      zohoPaymentFormData.append('Source_Domain', 'GC Checkout Form');

      await fetch(getApiUrl('/api/zoho/payment-status'), {
        method: 'POST',
        body: zohoPaymentFormData,
      });

      console.log('Zoho CRM updated with failed payment status');
    } catch (error) {
      console.error('Error updating Zoho CRM:', error);
    }
  };

  const handlePaymentFailure = async () => {
    try {
      // Get PayU response parameters
      const paymentData: any = {};
      searchParams.forEach((value, key) => {
        paymentData[key] = value;
      });

      console.log('PayU Failure Data:', paymentData);

      // Update Zoho CRM with failed payment status
      await updateZohoCRM(paymentData.email || '');

      toast({
        title: 'Payment Failed',
        description: 'Your payment could not be processed. Please try again.',
        variant: 'destructive',
      });

    } catch (error) {
      console.error('Payment failure handling error:', error);
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    handlePaymentFailure();
  }, []);

  if (processing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Processing payment status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h1>
        <p className="text-gray-600 mb-6">
          We couldn't process your payment. Please check your payment details and try again.
        </p>
        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href="/">Try Again</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}