'use client';

import { useRef } from 'react';

/**
 * viewRef 메핑된 위치로 스크롤을 이동시킨다.
 */

const useViewPositionScroll = <
  T extends HTMLElement | null = HTMLDivElement | null,
>() => {
  const viewRef = useRef<T>(null);

  const onClickViewScroll = () => {
    viewRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return { viewRef, onClickViewScroll };
};

export default useViewPositionScroll;
