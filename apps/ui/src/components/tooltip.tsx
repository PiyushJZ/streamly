import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice';

interface TooltipProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
}

export function CustomTooltip({ trigger, content }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const isTouchDevice = useIsTouchDevice();
  const ref = useRef(null);
  useClickAway(ref, handleClickOutside);

  function openTooltip() {
    if (isTouchDevice) {
      setOpen(true);
    }
  }

  function handleClickOutside() {
    if (!isTouchDevice) {
      setOpen(false);
    }
  }

  return (
    <TooltipProvider>
      <Tooltip
        open={open}
        onOpenChange={setOpen}
      >
        <TooltipTrigger
          onClick={openTooltip}
          asChild
        >
          {trigger}
        </TooltipTrigger>
        <TooltipContent ref={ref}>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
