'use client';

import { sendGAEvent } from '@next/third-parties/google';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const PageViewTracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    sendGAEvent('event', 'page_view', {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  return null; // UI 렌더링 필요 없음
};

export default PageViewTracker;
