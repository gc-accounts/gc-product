'use client';

import { Suspense } from 'react';
// import PaymentFailureContent from './PaymentFailureContent';
import PaymentFailureContent from '@/components/pages/PaymentFailureContent';

export default function PaymentFailure() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    }>
      <PaymentFailureContent />
    </Suspense>
  );
}