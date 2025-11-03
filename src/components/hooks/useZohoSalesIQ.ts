'use client';
import { useEffect } from 'react';

declare global {
  interface Window {
    $zoho?: any;
  }
}

export default function useZohoSalesIQ() {
  useEffect(() => {
    // prevent multiple script loads
    if (document.getElementById('zsiqscript')) return;

    // initialize Zoho global object
    window.$zoho = window.$zoho || {};
    window.$zoho.salesiq = window.$zoho.salesiq || { ready: function () {} };

    // create script element
    const script = document.createElement('script');
    script.id = 'zsiqscript';
    script.src =
      'https://salesiq.zohopublic.in/widget?wc=siq23cd6250aaf99ae5c654eec0cb9c750107386c2cac55bd040d78276dd1c4b235';
    script.defer = true;
    document.body.appendChild(script);

    // optional cleanup if component unmounts
    return () => {
      const existingScript = document.getElementById('zsiqscript');
      if (existingScript) existingScript.remove();
    };
  }, []);
}
