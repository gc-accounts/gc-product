'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function useUserMetrics() {
  const pathname = usePathname();
  const sessionStart = useRef<number>(Date.now());
  const sentRef = useRef(false);
  const scrollMarkedRef = useRef(false);

  useEffect(() => {
    sentRef.current = false;
    scrollMarkedRef.current = false;
    sessionStart.current = Date.now();

    if (!sessionStorage.getItem('page_visit_counted')) {
      const visits = Number(localStorage.getItem('page_visits') || '0') + 1;
      localStorage.setItem('page_visits', String(visits));
      sessionStorage.setItem('page_visit_counted', 'true');
    }

    const now = Date.now();
    const lastVisit = localStorage.getItem('last_visit');
    let returnVisit = '';
    if (lastVisit) {
      const diffDays = Math.floor((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));
      if (diffDays >= 1 && diffDays <= 7) {
        returnVisit = `After ${diffDays} Day${diffDays > 1 ? 's' : ''}`;
      } else if (diffDays > 7) {
        returnVisit = 'After 7 Days';
      }
    }
    localStorage.setItem('last_visit', String(now));
    localStorage.setItem('return_visit', returnVisit);

    if (!sessionStorage.getItem('scroll_end')) {
      sessionStorage.setItem('scroll_end', 'No');
    }

    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = Math.ceil(doc.scrollTop + window.innerHeight);
      if (!scrollMarkedRef.current && scrolled >= doc.scrollHeight - 64) {
        scrollMarkedRef.current = true;
        sessionStorage.setItem('scroll_end', 'Yes');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const sendOnce = () => {
      if (sentRef.current) return;
      sentRef.current = true;
      const minutes = (Date.now() - sessionStart.current) / (1000 * 60);
      let sessionCategory = '';
      if (minutes < 1) sessionCategory = 'Less than 1 Min';
      else if (minutes < 3) sessionCategory = '1-3 Mins';
      else if (minutes < 5) sessionCategory = '3-5 Mins';
      else sessionCategory = 'More than 5 Mins';

      const email = sessionStorage.getItem('submittedEmail') || localStorage.getItem('submittedEmail') || '';
      if (!email) return;

      const payload = {
        Email: email,
        'Total Website Visits': Number(localStorage.getItem('page_visits') || '0'),
        'Scroll End': sessionStorage.getItem('scroll_end') || 'No',
        'Time Spent on Website': sessionCategory,
        'Website Revisits': localStorage.getItem('return_visit') || '',
      };

      const url = '/api/zoho/user-metrics';
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      navigator.sendBeacon(url, blob);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') sendOnce();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', sendOnce, { capture: true });
    window.addEventListener('beforeunload', sendOnce);

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', sendOnce);
      window.removeEventListener('beforeunload', sendOnce);
    };
  }, [pathname]);
}
