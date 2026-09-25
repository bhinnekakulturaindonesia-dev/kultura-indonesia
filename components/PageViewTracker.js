'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function PageViewTracker({ pageType, pageSlug }) {
  const pathname = usePathname();

  useEffect(() => {
    // Only track once per page load
    const trackView = async () => {
      try {
        await fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pageUrl: pathname,
            pageType: pageType,
            pageSlug: pageSlug,
          }),
        });
      } catch (error) {
        // Silently fail - don't disrupt user experience
        console.error('Failed to track page view:', error);
      }
    };

    trackView();
  }, [pathname, pageType, pageSlug]);

  return null; // This component doesn't render anything
}
