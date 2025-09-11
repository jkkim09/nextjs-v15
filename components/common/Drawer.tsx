'use client';

import React, { useEffect, useState } from 'react';

type DrawerPosition = 'top' | 'right' | 'bottom' | 'left';

interface DrawerProps {
  isOpen?: boolean;
  position?: DrawerPosition;
  children: React.ReactNode;
}

const getPositionClasses = (position: DrawerPosition, isOpen: boolean) => {
  switch (position) {
    case 'top':
      return `top-0 left-0 w-full transform ${isOpen ? 'translate-y-0' : '-translate-y-full'}`;
    case 'right':
      return `top-0 right-0 h-full transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`;
    case 'bottom':
      return `bottom-0 left-0 w-full transform ${isOpen ? 'translate-y-0' : 'translate-y-full'}`;
    case 'left':
      return `top-0 left-0 h-full transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`;
    default:
      return '';
  }
};

const Drawer = ({ isOpen: open, position = 'left', children }: DrawerProps) => {
  const [isOpen, setIsOpen] = useState(open);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <>
      <div
        className={`fixed z-50 bg-white shadow-lg transition-transform duration-500 ease-in-out
          ${getPositionClasses(position, !!isOpen)}`}
      >
        <div className="p-4">
          {/*  닫기 버튼 */}
          <button onClick={toggleDrawer} className="float-right text-xl">
            &times;
          </button>
          {children}
        </div>
      </div>

      {isOpen && (
        <div
          onClick={toggleDrawer}
          className="fixed inset-0 bg-black opacity-50 z-40"
        />
      )}
    </>
  );
};

export default Drawer;
