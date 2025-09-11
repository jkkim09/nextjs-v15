'use client';

import { useEffect, useState } from 'react';

/**
 * 최상단으로 스크롤 이동
 */
const useTopButton = () => {
  const [ScrollY, setScrollY] = useState<number>(0);
  const [showTopButton, setShowTopButton] = useState<boolean>(false); // 버튼 상태

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    if (ScrollY > 100) {
      // 100 이상이면 버튼이 보이게
      setShowTopButton(true);
    } else {
      // 100 이하면 버튼이 사라지게
      setShowTopButton(false);
    }
  };

  const handleTop = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setScrollY(0); // ScrollY 의 값을 초기화
    setShowTopButton(false); // BtnStatus의 값을 false로 바꿈 => 버튼 숨김
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow);
    };
    handleFollow();
    watch();
    return () => {
      window.removeEventListener('scroll', handleFollow);
    };
  });

  return {
    showTopButton,
    handleTop,
  };
};

export default useTopButton;
