'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  content: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ className, content, children, side = 'top', ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div
        ref={ref}
        className="relative inline-block"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        {...props}
      >
        {children}
        {isOpen && (
          <div
            className={cn(
              'absolute z-50 rounded-md bg-foreground px-2 py-1 text-sm text-background',
              {
                'bottom-full mb-2': side === 'top',
                'top-full mt-2': side === 'bottom',
                'left-full ml-2': side === 'right',
                'right-full mr-2': side === 'left',
              },
              className
            )}
          >
            {content}
          </div>
        )}
      </div>
    );
  }
);
Tooltip.displayName = 'Tooltip';

export { Tooltip };
