'use client';

import { useRef, useEffect } from 'react';
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

  // Animations
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      }
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        delay: 0.2, 
        ease: "easeOut" 
      }
    },
  };

  const lineVariants = {
    hidden: { width: 0 },
    visible: { 
      width: '100%',
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`mb-12 ${alignmentClasses[align]} ${className}`}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.h2 
        className="text-3xl md:text-4xl font-bold mb-3 neon-blue"
        variants={titleAnimation}
      >
        {title}
      </motion.h2>
      
      <motion.div
        className="relative h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full mb-4 mx-auto"
        variants={lineAnimation}
      />
      
      {subtitle && (
        <motion.p 
          className="text-base md:text-lg opacity-80 max-w-xl"
          variants={subtitleAnimation}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
