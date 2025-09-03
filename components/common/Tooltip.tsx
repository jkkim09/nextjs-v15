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
  position?: 'top' | 'bottom';
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

      setStyle({
        position: 'fixed',
        top,
        left: rect.left,
        background: '#222',
        color: '#fff',
        padding: '8px 12px',
        borderRadius: 4,
        zIndex: 9999,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
        transform: position === 'top' ? 'translateY(-100%)' : 'none', // 위일 때는 위로 밀기
      });
    }
  }, [visible, position]);

  return (
    <>
      <div
        ref={childRef}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        style={{ display: 'inline-block' }}
      >
        {children}
      </div>
      {/* body 에추가 */}
      {visible &&
        createPortal(<div style={style}>{content}</div>, document.body)}
    </>
  );
};

export default Tooltip;
