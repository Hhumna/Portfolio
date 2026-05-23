'use client';

import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface GlassPanelProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'lume';
}

const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn(
        'surface-glass',
        variant === 'lume' && 'before:absolute before:inset-0 before:bg-gradient-to-br before:from-accent/10 before:via-transparent before:to-transparent before:opacity-50',
        className
      )}
      {...props}
    >
      {props.children}
    </motion.div>
  )
);
GlassPanel.displayName = 'GlassPanel';

export { GlassPanel };
