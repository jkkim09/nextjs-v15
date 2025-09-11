import { useEffect, useRef } from 'react';

interface UseOutsideClickHandlerOptions {
  onClose: () => void;
}

/**
 * 외부 영역 클릭 감지
 */
const useOutsideClickHandler = ({ onClose }: UseOutsideClickHandlerOptions) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return { ref };
};

export default useOutsideClickHandler;
