// components/DatadogRum.tsx
'use client';

import { useEffect } from 'react';
import { datadogRum } from '@datadog/browser-rum';

export default function DatadogRum() {
  useEffect(() => {
    datadogRum.init({
      applicationId: process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID!,
      clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN!,
      site: (process.env.NEXT_PUBLIC_DATADOG_SITE as any) ?? 'datadoghq.com',
      env: process.env.NEXT_PUBLIC_DATADOG_ENV || 'production',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });

    datadogRum.startSessionReplayRecording();
  }, []);

  return null;
}
