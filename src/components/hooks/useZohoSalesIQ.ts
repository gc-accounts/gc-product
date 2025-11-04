'use client';
import { useEffect } from 'react';
import { getUTMTrackingData } from '@/components/utils/getUTMTrackingData';
import { getOriginalTrafficSource } from '@/components/utils/getOriginalTrafficSource';
import { fetchUserLocation } from '@/components/utils/fetchUserLocation'; // already used in your form

declare global {
  interface Window {
    $zoho?: any;
  }
}

export default function useZohoSalesIQ() {
  useEffect(() => {
    // prevent duplicate injection
    if (document.getElementById('zsiqscript')) return;

    // Initialize Zoho global object
    window.$zoho = window.$zoho || {};
    window.$zoho.salesiq = window.$zoho.salesiq || { ready: function () {} };

    // Load Zoho SalesIQ widget script dynamically
    const script = document.createElement('script');
    script.id = 'zsiqscript';
    script.src =
      'https://salesiq.zohopublic.in/widget?wc=siq23cd6250aaf99ae5c654eec0cb9c750107386c2cac55bd040d78276dd1c4b235';
    script.defer = true;
    document.body.appendChild(script);

    // Once SalesIQ is ready
    window.$zoho.salesiq.ready = async function () {
      try {
        // Get UTM + GA tracking info
        const utm = getUTMTrackingData();
        const originalTrafficSource = getOriginalTrafficSource(utm);

        // Get user location (city, state, country)
        const location = await fetchUserLocation();

        // Detect current page path (so you can vary Source_Domain dynamically)
        const currentPath = window.location.pathname;
        let sourceDomain = 'GC Home Form';
        if (currentPath.includes('data-science')) {
          sourceDomain = 'GC Data Science Chatbot';
        } else if (currentPath.includes('ai')) {
          sourceDomain = 'GC AI Chatbot';
        }

        // Push info into Zoho SalesIQ session
        window.$zoho.salesiq.visitor.info({
          // --- UTM / Source Tracking ---
          "Original Traffic Source": originalTrafficSource,
          "Original Traffic Source Drill-Down 1": utm["Original Traffic Source Drill-Down 1"] || "",
          "Original Traffic Source Drill-Down 2": utm["Original Traffic Source Drill-Down 2"] || "",
          "UTM Term-First Page Seen": utm["UTM Term-First Page Seen"] || "",
          "UTM Content-First Page Seen": utm["UTM Content-First Page Seen"] || "",
          "First Page Seen": utm["First Page Seen"] || "",
          "ads_gclid": utm["ads_gclid"] || "",
          "Source_Domain": 'GC Home Form',

          // --- Location Info ---
          "Other_City": location?.city || "",
          "Other_State": location?.region || "",
          "Country": location?.country || "",
        });

        console.log("✅ SalesIQ visitor info set:", {
          ...utm,
          originalTrafficSource,
          sourceDomain,
          location,
        });
      } catch (err) {
        console.error("❌ Failed to set Zoho SalesIQ visitor info:", err);
      }
    };

    // Cleanup on unmount
    return () => {
      const el = document.getElementById('zsiqscript');
      if (el) el.remove();
    };
  }, []);
}
