'use client';

import { useEffect, useState } from 'react';
import useCustomCursor from '@/hooks/useCustomCursor';

const CustomCursor = () => {
  const { position, isHovering } = useCustomCursor();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide cursor on mobile devices
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    setIsVisible(!isMobile);

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`custom-cursor ${isHovering ? 'hover' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        backgroundColor: isHovering ? 'var(--secondary)' : 'var(--primary)',
      }}
    />
  );
};

export default CustomCursor;
