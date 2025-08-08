'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const SectionHeading = ({
  title,
  subtitle,
  align = 'center',
  className = '',
}: SectionHeadingProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <div
      ref={ref}
      className={`mb-12 ${alignmentClasses[align]} ${className}`}
    >
      <motion.h2 
        className="text-3xl md:text-4xl font-bold mb-3 neon-blue"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>
      
      <motion.div
        className="relative h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full mb-4 mx-auto"
        initial={{ width: 0 }}
        animate={isInView ? { width: '100%' } : { width: 0 }}
        transition={{ duration: 0.8 }}
      />
      
      {subtitle && (
        <motion.p 
          className="text-base md:text-lg opacity-80 max-w-xl"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
