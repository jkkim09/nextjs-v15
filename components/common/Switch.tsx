import { Label } from '@/components/ui/label';
import { Switch as SwitchRoot } from '@/components/ui/switch';
import { cva, VariantProps } from 'class-variance-authority';

const buttonVariants = cva('cursor-pointer inline-flex items-center', {
  variants: {
    variant: {
      //   default:
      //     'bg-white text-primary-foreground text-primary hover:bg-primary/90 hover:text-white',
      //   secondary:
      //     'bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:text-white',
    },
    size: {
      small: 'h-5 w-9',
      middle: 'h-7 w-11 [&>span]:w-6 [&>span]:h-6',
      large: 'h-8 w-12 [&>span]:w-7 [&>span]:h-7',
    },
  },
  defaultVariants: {
    // variant: 'default',
    size: 'middle',
  },
});

interface SwitchDemoProps extends VariantProps<typeof buttonVariants> {
  id?: string;
  label?: string;
  checked?: boolean;
  className?: string;
  onChange?: (checked: boolean) => void;
}

const Switch = ({
  id = 'switch-component',
  size = 'middle',
  label,
  checked,
  variant,
  className,
  onChange,
}: SwitchDemoProps) => {
  return (
    <div className="flex items-center space-x-2">
      <SwitchRoot
        id={id}
        className={buttonVariants({ variant, size, className })}
        checked={checked}
        onCheckedChange={onChange}
      />
      {label && <Label htmlFor={id}>{label}</Label>}
    </div>
  );
};

export default Switch;
