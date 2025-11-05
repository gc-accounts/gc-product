'use client';
import { useEffect } from 'react';
import { getUTMTrackingData } from '@/components/utils/getUTMTrackingData';
import { getOriginalTrafficSource } from '@/components/utils/getOriginalTrafficSource';
import { fetchUserLocation } from '@/components/utils/fetchUserLocation';

declare global {
  interface Window {
    $zoho?: any;
  }
}

export default function useZohoSalesIQ() {
  useEffect(() => {
    // Prevent duplicate injection
    if (document.getElementById('zsiqscript')) return;

    const currentPath = window.location.pathname;
    const isHomePage = currentPath === '/';

    // --- Step 1: Hide widget only for non-home pages ---
    let style: HTMLStyleElement | null = null;
    if (!isHomePage) {
      style = document.createElement('style');
      style.innerHTML = `
        #zsiq_float, #zsiqbtn, #zsiqtooltip, #zsiqlauncher, #zsiqchatstage {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Initialize Zoho global object
    window.$zoho = window.$zoho || {};
    window.$zoho.salesiq = window.$zoho.salesiq || { ready: function () {} };

    // Load Zoho SalesIQ script dynamically
    const script = document.createElement('script');
    script.id = 'zsiqscript';
    script.src =
      'https://salesiq.zohopublic.in/widget?wc=siq23cd6250aaf99ae5c654eec0cb9c750107386c2cac55bd040d78276dd1c4b235';
    script.defer = true;
    document.body.appendChild(script);

    // --- Step 2: When SalesIQ is ready ---
    window.$zoho.salesiq.ready = async function () {
      try {
        const utm = getUTMTrackingData();
        const originalTrafficSource = getOriginalTrafficSource(utm);
        const location = await fetchUserLocation();

        let sourceDomain = 'GC Home Chatbot';
        if (currentPath.includes('data-science')) {
          sourceDomain = 'GC Data Science Chatbot';
        } else if (currentPath.includes('ai')) {
          sourceDomain = 'GC AI Chatbot';
        }

        // Push visitor info
        window.$zoho.salesiq.visitor.info({
          'Original Traffic Source': originalTrafficSource,
          'Original Traffic Source Drill-Down 1':
            utm['Original Traffic Source Drill-Down 1'] || '',
          'Original Traffic Source Drill-Down 2':
            utm['Original Traffic Source Drill-Down 2'] || '',
          'UTM Term-First Page Seen': utm['UTM Term-First Page Seen'] || '',
          'UTM Content-First Page Seen':
            utm['UTM Content-First Page Seen'] || '',
          'First Page Seen': utm['First Page Seen'] || '',
          ads_gclid: utm['ads_gclid'] || '',
          Source_Domain: sourceDomain,
          Other_City: location?.city || '',
          Other_State: location?.region || '',
          Country: location?.country || '',
        });

        console.log('✅ SalesIQ visitor info set:', {
          ...utm,
          originalTrafficSource,
          sourceDomain,
          location,
        });

        // --- Step 3: Fix chat positioning after load ---
        setTimeout(() => {
          const widgetContainer = document.getElementById('zsiq_float');
          const chatWindow = document.querySelector('#zsiqwidget') as HTMLElement;

          if (widgetContainer) {
            widgetContainer.style.bottom = '10px';
            widgetContainer.style.right = '20px';
            widgetContainer.style.zIndex = '9999';
          }

          if (chatWindow) {
            chatWindow.style.top = '100px'; // push below navbar
            chatWindow.style.height = 'calc(100vh - 90px)';
            chatWindow.style.borderRadius = '12px';
            chatWindow.style.overflow = 'hidden';
            chatWindow.style.zIndex = '1000';
            chatWindow.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
          }

          console.log('🎯 Chatbox repositioned to avoid header overlap.');

          // Auto-open for non-home pages
          if (!isHomePage && window.$zoho?.salesiq?.chat) {
            window.$zoho.salesiq.chat.start();
          }

          // Unhide widget after chat loads
          if (style && style.parentNode) {
            style.parentNode.removeChild(style);
          }
        }, 2000);
      } catch (err) {
        console.error('❌ Failed to initialize Zoho SalesIQ:', err);
      }
    };

    // Cleanup on unmount
    return () => {
      const el = document.getElementById('zsiqscript');
      if (el) el.remove();
      if (style && style.parentNode) style.parentNode.removeChild(style);
    };
  }, []);
}
