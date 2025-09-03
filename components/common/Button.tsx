'use client';

import { Slot } from '@radix-ui/react-slot';
import { cva, VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva('cursor-pointer inline-flex items-center', {
  variants: {
    variant: {
      default:
        'bg-white text-primary-foreground text-primary hover:bg-primary/90 hover:text-white',
      secondary:
        'bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:text-white',
    },
    size: {
      default: 'h-10 px-4 py-2',
    },
    outline: {
      true: 'border-1',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  outline,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className, outline }))}
      {...props}
    />
  );
};

export default Button;
