'use client';

import { useEffect } from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;

    // Cookie collection logic
    try {
      // 1. Get existing cookies or initialize
      const cookieConsent = localStorage.getItem('cookieConsent') || 'not-set';

      // 2. Check if we need to show consent banner
      if (cookieConsent === 'not-set') {
        // Implement your cookie consent banner UI here
        console.log('Show cookie consent banner');

        // For demo: auto-accept after 3 seconds
        setTimeout(() => {
          localStorage.setItem('cookieConsent', 'accepted');
          console.log('Cookies accepted');
          initializeCookies();
        }, 3000);
      }
      // 3. If already accepted, initialize cookies
      else if (cookieConsent === 'accepted') {
        initializeCookies();
      }
    } catch (error) {
      console.error('Cookie handling failed:', error);
    }
  }, []);

  // Function to initialize cookies
  const initializeCookies = () => {
    try {
      // Set essential cookies
      document.cookie = 'essential=true; path=/; max-age=31536000'; // 1 year

      // Example: Set analytics cookie if permitted
      const analyticsConsent = localStorage.getItem('analyticsConsent') === 'true';
      if (analyticsConsent) {
        document.cookie = 'analytics_enabled=true; path=/; max-age=31536000';
        console.log('Analytics cookies set');
      }

      // Example: Set preference cookie
      const userPreferences = localStorage.getItem('userPreferences') || '{}';
      document.cookie = `preferences=${encodeURIComponent(userPreferences)}; path=/; max-age=31536000`;
    } catch (error) {
      console.error('Cookie initialization failed:', error);
    }
  };

  return <>{children}</>;
}
