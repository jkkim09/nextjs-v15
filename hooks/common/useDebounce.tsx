'use client';

import { useRef } from 'react';

interface IDebounceOnClickProps {
  autoReset?: boolean;
  resetTime?: number;
}
/**
 * 중복 클릭 방지 훅
 */
const useDebounce = () => {
  const debounceRef = useRef<boolean>(false);

  const setDebounce = (value: boolean) => {
    debounceRef.current = value;
  };

  const debounceOnClick = (
    callback: () => void,
    options?: IDebounceOnClickProps
  ) => {
    if (!debounceRef.current) {
      callback();
      setDebounce(true);

      const { autoReset = true, resetTime = 777 } = options || {};
      if (autoReset) {
        console.log('autoReset', autoReset, resetTime);
        setTimeout(() => {
          setDebounce(false);
        }, resetTime);
      }
    }
  };

  return {
    debounceRef,
    setDebounce,
    debounceOnClick,
  };
};

export default useDebounce;
