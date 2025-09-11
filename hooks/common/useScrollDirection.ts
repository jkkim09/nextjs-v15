import { useEffect, useRef, useState } from 'react';

const useScrollDirection = () => {
  const lastScrollTop = useRef<number>(window.pageYOffset);
  const [scrollTop, setScrollTop] = useState<number>(window.pageYOffset);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    const headerVisibleFunc = () => {
      // 현재 스크롤 위치 가져오기
      const currentScrollTop = window.scrollY;

      // 스크롤 방향 확인
      if (currentScrollTop > lastScrollTop.current) {
        // 아랫 방향 스크롤
        setDirection('down');
      } else {
        // 윗 방향 스크롤
        setDirection('up');
      }

      // 기준 스크롤 위치 업데이트
      lastScrollTop.current = currentScrollTop;
      setScrollTop(window.pageYOffset);
    };

    lastScrollTop.current = window.pageYOffset;
    setScrollTop(window.pageYOffset);

    // 스크롤 이벤트 핸들러 등록
    window.addEventListener('scroll', headerVisibleFunc);

    // 스크롤 이벤트 핸들러 제거
    return () => {
      window.removeEventListener('scroll', headerVisibleFunc);
    };
  }, []);

  return {
    scrollTop,
    direction,
  };
};

export default useScrollDirection;
