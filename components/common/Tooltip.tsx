import { cn } from '@/lib/utils';
import React, {
  useRef,
  useState,
  useEffect,
  ReactNode,
  ReactElement,
} from 'react';
import { createPortal } from 'react-dom';

type TooltipProps = {
  content: ReactNode;
  children: ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
};

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
}) => {
  const childRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (visible && childRef.current) {
      const rect = childRef.current.getBoundingClientRect();

      let top = 0;
      if (position === 'bottom') {
        top = rect.bottom + 8;
      } else {
        top = rect.top - 8; // 위쪽
      }

      let styleValue: React.CSSProperties = {
        position: 'fixed',
        top,
        background: '#222',
        color: '#fff',
        padding: '8px 12px',
        borderRadius: 4,
        zIndex: 9999,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        transform: position === 'top' ? 'translateY(-100%)' : 'none', // 위일 때는 위로 밀기
      };

      console.log('rect', rect);

      if (position === 'left') {
        styleValue.left = 12;
      } else if (position === 'right') {
        styleValue.left = rect.right + 12;
      } else if (position === 'top' || position === 'bottom') {
        styleValue.left = rect.right / 2 + 10;
      }

      setStyle(styleValue);
    }
  }, [visible, position]);

  return (
    <>
      <div
        ref={childRef}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className={cn('max-w-max')}
      >
        {children}
      </div>
      {/* body 에추가 */}
      {visible &&
        createPortal(
          <div style={style}>
            {content}
            {position === 'right' && (
              <div
                className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 w-0 h-0
              border-t-8 border-t-transparent 
              border-r-8 border-r-[#222] 
              border-b-8 border-b-transparent"
              ></div>
            )}
            {position === 'left' && (
              <div
                className="absolute right-[-16px] top-1/2 -translate-x-full -translate-y-1/2 w-0 h-0
              border-t-8 border-t-transparent 
              border-l-8 border-[#222]
              border-b-8 border-b-transparent"
              ></div>
            )}

            {position === 'bottom' && (
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-0 h-0
              border-l-8 border-l-transparent
              border-b-8 border-[#222]
              border-r-8 border-r-transparent"
              ></div>
            )}
            {position === 'top' && (
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0
              border-l-8 border-l-transparent
              border-t-8 border-[#222]
              border-r-8 border-r-transparent"
              ></div>
            )}
          </div>,
          document.body
        )}
    </>
  );
};

export default Tooltip;
