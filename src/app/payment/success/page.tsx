'use client';

import { Suspense } from 'react';
import PaymentSuccessContent from '@/components/pages/PaymentSuccessContent';
export default function PaymentSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Loading payment status...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}