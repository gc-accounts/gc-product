'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type PaymentStatus = 'success' | 'failed' | 'processing';

export default function PaymentCompletePage() {
  const [status, setStatus] = useState<PaymentStatus>('processing');
  const [txnid, setTxnid] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    console.log('🔄 Payment complete page loaded');
    
    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const statusParam = urlParams.get('status');
    const txnidParam = urlParams.get('txnid');
    const errorParam = urlParams.get('error');

    console.log('📊 URL Parameters:', { statusParam, txnidParam, errorParam });

    if (txnidParam) setTxnid(txnidParam);
    if (errorParam) setError(errorParam);

    if (statusParam === 'success') {
      setStatus('success');
    } else if (statusParam === 'failed' || errorParam) {
      setStatus('failed');
    } else {
      // If no status parameter, assume processing
      setStatus('processing');
    }
  }, []);

  const getErrorMessage = () => {
    switch (error) {
      case 'hash_mismatch':
        return 'Payment verification failed. Please contact support.';
      case 'internal_server_error':
        return 'An unexpected error occurred. Please try again.';
      default:
        return 'We couldn\'t process your payment. Please check your payment details and try again.';
    }
  };

  if (status === 'processing') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <Loader2 className="h-16 w-16 animate-spin text-blue-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Processing Payment</h1>
          <p className="text-gray-600 mb-6">
            Please wait while we confirm your payment status...
          </p>
          {txnid && <p className="text-sm text-gray-500">Transaction ID: {txnid}</p>}
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-4">
            Thank you for your payment. Your enrollment has been confirmed.
          </p>
          {txnid && (
            <p className="text-sm text-gray-500 mb-6">
              Transaction ID: {txnid}
            </p>
          )}
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h1>
        <p className="text-gray-600 mb-4">
          {getErrorMessage()}
        </p>
        {txnid && (
          <p className="text-sm text-gray-500 mb-6">
            Transaction ID: {txnid}
          </p>
        )}
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