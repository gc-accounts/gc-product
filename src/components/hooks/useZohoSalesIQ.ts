'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getUTMTrackingData } from '@/components/utils/getUTMTrackingData';
import { getOriginalTrafficSource } from '@/components/utils/getOriginalTrafficSource';
import { fetchUserLocation } from '@/components/utils/fetchUserLocation';

declare global {
  interface Window {
    $zoho?: any;
  }
}

export default function useZohoSalesIQ() {
  const pathname = usePathname();

  // ✅ Clear chat flag + trigger auto-open on every route change
  useEffect(() => {
    // Clear chat flag on route change
    sessionStorage.removeItem('chatAutoOpened');

    let autoOpenTimer: NodeJS.Timeout | null = null;
    let manualClickListener: (() => void) | null = null;

    const startAutoOpenTimer = () => {
      // Wait 10 seconds, then auto-click chat button if available and not opened manually
      autoOpenTimer = setTimeout(() => {
        const chatButton = document.getElementById('zsiq_float');
        if (chatButton && !sessionStorage.getItem('chatAutoOpened')) {
          chatButton.click();
          sessionStorage.setItem('chatAutoOpened', 'true');
        }
      }, 5000);
    };

    // Watch for user manually clicking chat widget
    const watchManualChatOpen = () => {
      const chatButton = document.getElementById('zsiq_float');
      if (chatButton) {
        manualClickListener = () => {
          // User manually opened chatbot
          sessionStorage.setItem('chatAutoOpened', 'true');
          if (autoOpenTimer) clearTimeout(autoOpenTimer);
        };
        chatButton.addEventListener('click', manualClickListener);
      } else {
        // Retry until button loads
        setTimeout(watchManualChatOpen, 500);
      }
    };

    // Start both
    startAutoOpenTimer();
    watchManualChatOpen();

    // Cleanup on route change
    return () => {
      if (autoOpenTimer) clearTimeout(autoOpenTimer);
      const chatButton = document.getElementById('zsiq_float');
      if (chatButton && manualClickListener) {
        chatButton.removeEventListener('click', manualClickListener);
      }
    };
  }, [pathname]);

  // ✅ Run once — inject and configure Zoho SalesIQ
  useEffect(() => {
    if (document.getElementById('zsiqscript')) return;

    window.$zoho = window.$zoho || {};
    window.$zoho.salesiq = window.$zoho.salesiq || { ready: function () {} };

    const script = document.createElement('script');
    script.id = 'zsiqscript';
    script.src =
      'https://salesiq.zohopublic.in/widget?wc=siq23cd6250aaf99ae5c654eec0cb9c750107386c2cac55bd040d78276dd1c4b235';
    script.defer = true;
    document.body.appendChild(script);

    window.$zoho.salesiq.ready = async function () {
      try {
        const utm = getUTMTrackingData();
        const originalTrafficSource = getOriginalTrafficSource(utm);
        const location = await fetchUserLocation();

        const currentPath = window.location.pathname;
        let sourceDomain = 'GC Website Chatbot';
        if (currentPath.includes('data-science')) {
          sourceDomain = 'GC Data Science Chatbot';
        } else if (currentPath.includes('ai')) {
          sourceDomain = 'GC AI Chatbot';
        }

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

        // --- Adjust widget styling ---
        setTimeout(() => {
          const widgetContainer = document.getElementById('zsiq_float');
          const chatWindow = document.querySelector('#zsiqwidget') as HTMLElement;

          if (widgetContainer) {
            widgetContainer.style.bottom = '20px';
            widgetContainer.style.right = '20px';
            widgetContainer.style.zIndex = '9999';
          }

          if (chatWindow) {
            chatWindow.style.top = '80px';
            chatWindow.style.height = 'calc(100vh - 100px)';
            chatWindow.style.borderRadius = '12px';
            chatWindow.style.overflow = 'hidden';
            chatWindow.style.zIndex = '1000';
            chatWindow.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
          }
        }, 2000);
      } catch {
        // silent fail
      }
    };

    return () => {
      const el = document.getElementById('zsiqscript');
      if (el) el.remove();
    };
  }, []);
}
