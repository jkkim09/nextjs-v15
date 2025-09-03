'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export function usePreventNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 새로고침 / 닫기 방지 (일부 브라우저는 무시할 수 있음)
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ''; // 크롬 기준 필수
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    //  뒤로가기 / 앞으로가기 방지
    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault();
      // popstate 발생 후 약간 지연시켜 현재 경로 다시 push
      setTimeout(() => {
        router.replace(pathname); // replace로 강제 고정
      }, 0);
    };
    window.addEventListener('popstate', handlePopState);

    //  pushState, replaceState까지 가로채기 (프로그램적 이동 방지)
    const pushState = history.pushState;
    const replaceState = history.replaceState;

    history.pushState = function (...args) {
      console.warn('Navigation blocked (pushState)', args);
      return pushState.apply(this, args as never);
    };

    history.replaceState = function (...args) {
      console.warn('Navigation blocked (replaceState)', args);
      return replaceState.apply(this, args as never);
    };

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
      history.pushState = pushState;
      history.replaceState = replaceState;
    };
  }, [router, pathname]);
}
