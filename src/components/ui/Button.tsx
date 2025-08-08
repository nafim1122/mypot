'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  isExternal?: boolean;
  icon?: React.ReactNode;
}

const Button = ({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  isExternal = false,
  icon,
}: ButtonProps) => {
  // Styles based on variant
  const variantStyles = {
    primary:
      'bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-primary/20',
    secondary: 'bg-dark-light text-light border border-primary/20 hover:border-primary',
    outline: 'bg-transparent text-light border border-primary hover:bg-primary/10',
  };

  // Styles based on size
  const sizeStyles = {
    sm: 'text-sm py-2 px-3',
    md: 'text-base py-2.5 px-5',
    lg: 'text-lg py-3 px-6',
  };

  // Combined classes
  const buttonClasses = `
    inline-flex items-center justify-center rounded-md 
    transition-all duration-300 ease-in-out neon-glow
    ${variantStyles[variant]} 
    ${sizeStyles[size]} 
    ${className}
  `;

  const buttonContent = (
    <>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </>
  );

  // Framer Motion hover effect
  const hoverAnimation = {
    scale: 1.03,
    transition: { duration: 0.2 },
  };

  // If href is provided, render a link
  if (href) {
    if (isExternal) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses}
          onClick={onClick}
          whileHover={hoverAnimation}
          whileTap={{ scale: 0.98 }}
        >
          {buttonContent}
        </motion.a>
      );
    }

    return (
      <motion.div whileHover={hoverAnimation} whileTap={{ scale: 0.98 }}>
        <Link href={href} className={buttonClasses} onClick={onClick}>
          {buttonContent}
        </Link>
      </motion.div>
    );
  }

  // Otherwise render a button
  return (
    <motion.button
      className={buttonClasses}
      onClick={onClick}
      whileHover={hoverAnimation}
      whileTap={{ scale: 0.98 }}
    >
      {buttonContent}
    </motion.button>
  );
};

export default Button;
