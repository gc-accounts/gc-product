'use client';

import React from 'react';
import { useUserMetrics } from './hooks/useUserMetrics';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {

  useUserMetrics();

  return (
    <>
      {children}
    </>
  );
}