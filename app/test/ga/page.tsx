'use client';

import Button from '@/components/common/Button';
import { sendAnalyticsEvent } from '@/utils/analytics';
import { sendGAEvent } from '@next/third-parties/google';
import Link from 'next/link';

const GaPage = () => {
  return (
    <section>
      <h1>GA Page</h1>
      {/* 
        sendGAEvent 함수는 dataLayer 객체를 사용하여 이벤트를
        전송함으로써 페이지에서 사용자 상호작용을 측정하는 데 사용할 수 있습니다.   

        sendGAEvent(
            eventType: string,
            eventName: string,     // es) button_click, purchase
            params?: Record<string, any>
        ): void

        Or 

        sendGAEvent(
            eventName: string,
            params?: Record<string, any>
        ): void
      */}
      <Button
        onClick={() => sendGAEvent('event', 'buttonClicked', { value: 123 })}
      >
        GA Click
      </Button>
      <Button
        onClick={() => {
          sendAnalyticsEvent({
            name: 'purchase',
            params: { transaction_id: 'T123', value: 100, currency: 'KRW' },
          });
        }}
      >
        GA GTA
      </Button>
      <Link href={'/'}>Root Page</Link>
    </section>
  );
};

export default GaPage;
