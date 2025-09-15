import UiPage from '@/components/test/UiPage';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Test Page', // 기본 제목
    template: 'UI', // 페이지 제목 + 접미사
  },
};

const UiTestPage = async () => {
  return <UiPage />;
};

export default UiTestPage;
