import {
  Tooltip as TooltipRoot,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Button from './Button';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'left' | 'top' | 'right' | 'bottom';
}

const Tooltip = ({ content, children, position = 'top' }: TooltipProps) => {
  return (
    <TooltipRoot>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={position} className="">
        <p>{content}</p>
      </TooltipContent>
    </TooltipRoot>
  );
};

export default Tooltip;
