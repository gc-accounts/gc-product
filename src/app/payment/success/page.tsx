'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/components/hooks/use-toast';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getApiUrl } from '@/lib/api';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [verifying, setVerifying] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'failed' | 'pending'>('pending');

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

  const updateZohoCRM = async (email: string, status: 'Paid' | 'Failed', paymentId?: string) => {
    try {
      const accessToken = await getAccessTokenForPayment();
      
      const zohoPaymentFormData = new FormData();
      zohoPaymentFormData.append('accessToken', accessToken);
      zohoPaymentFormData.append('Email', email);
      zohoPaymentFormData.append('Program', 'GC Data Science Bootcamp');
      zohoPaymentFormData.append('Payment_Status', status);
      zohoPaymentFormData.append('Payable_Amount', '5900');
      zohoPaymentFormData.append('Effective_Bootcamp_Fee', '5000');
      zohoPaymentFormData.append('Business_Unit', 'GreyCampus');
      zohoPaymentFormData.append('Source_Domain', 'GC Checkout Form');
      
      if (paymentId) {
        zohoPaymentFormData.append('Payment_ID', paymentId);
      }

      const response = await fetch(getApiUrl('/api/zoho/payment-status'), {
        method: 'POST',
        body: zohoPaymentFormData,
      });

      if (!response.ok) {
        throw new Error('Failed to update Zoho CRM');
      }
      
      console.log('Zoho CRM updated successfully');
    } catch (error) {
      console.error('Error updating Zoho CRM:', error);
    }
  };

  const verifyPayment = async () => {
    try {
      // Get all PayU response parameters
      const paymentData: any = {};
      searchParams.forEach((value, key) => {
        paymentData[key] = value;
      });

      console.log('PayU Response Data:', paymentData);

      const verifyRes = await fetch(getApiUrl('/api/payment/verify-payu-payment'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });

      const verifyData = await verifyRes.json();

      if (verifyData.status === 'success') {
        setPaymentStatus('success');
        
        // Update Zoho CRM with successful payment
        await updateZohoCRM(
          paymentData.email || '', 
          'Paid', 
          paymentData.txnid || paymentData.mihpayid
        );

        toast({
          title: 'Payment Successful!',
          description: 'Thank you for your purchase. Your enrollment is confirmed.',
        });
      } else {
        setPaymentStatus('failed');
        
        // Update Zoho CRM with failed payment
        await updateZohoCRM(paymentData.email || '', 'Failed');

        toast({
          title: 'Payment Failed',
          description: 'Your payment could not be processed. Please try again.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      setPaymentStatus('failed');
      
      // Try to update Zoho CRM even if verification fails
      const paymentData: any = {};
      searchParams.forEach((value, key) => {
        paymentData[key] = value;
      });
      
      await updateZohoCRM(paymentData.email || '', 'Failed');
    } finally {
      setVerifying(false);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Verifying your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {paymentStatus === 'success' ? (
          <>
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your payment. Your enrollment has been confirmed.
            </p>
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </>
        ) : (
          <>
            <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h1>
            <p className="text-gray-600 mb-6">
              Your payment could not be processed. Please try again.
            </p>
            <Button asChild>
              <Link href="/">Try Again</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}