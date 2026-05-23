'use client';

import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface SectionProps extends HTMLMotionProps<'section'> {
  container?: boolean;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, container = true, ...props }, ref) => (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'relative py-24 md:py-32 lg:py-40',
        container && 'container mx-auto px-6',
        className
      )}
      {...props}
    >
      {props.children}
    </motion.section>
  )
);
Section.displayName = 'Section';

export { Section };
