'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: 'slow' | 'normal' | 'fast';
  pauseOnHover?: boolean;
}

const Marquee = React.forwardRef<HTMLDivElement, MarqueeProps>(
  ({ className, speed = 'normal', pauseOnHover = true, children, ...props }, ref) => {
    const speedClass = {
      slow: 'animate-marquee-slow',
      normal: 'animate-marquee',
      fast: 'animate-marquee-fast',
    }[speed];

    return (
      <div
        ref={ref}
        className={cn('overflow-hidden', className)}
        {...props}
      >
        <div
          className={cn(
            'flex gap-4 whitespace-nowrap',
            speedClass,
            pauseOnHover && 'hover:pause'
          )}
        >
          {children}
          {children}
        </div>
      </div>
    );
  }
);
Marquee.displayName = 'Marquee';

export { Marquee };
