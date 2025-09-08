'use client';

import * as Icons from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

interface LucideIconProps {
  name: keyof typeof Icons;
  size?: number;
  fill?: string;
  color?: string;
  className?: string;
  strokeWidth?: string | number;
}

const LucideIcon = ({
  name,
  size = 24,
  fill = '#fff',
  color = 'currentColor',
  className,
  strokeWidth,
}: LucideIconProps) => {
  const IconComponent = Icons[name] as ForwardRefExoticComponent<
    Omit<Icons.LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;

  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent
      size={size}
      color={color}
      fill={fill}
      strokeWidth={strokeWidth}
      className={className}
    />
  );
};

export default LucideIcon;
