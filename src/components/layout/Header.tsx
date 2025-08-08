'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { navLinks } from '@/constants';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, x: '100%', transition: { duration: 0.3 } },
    open: { opacity: 1, x: 0, transition: { duration: 0.4, staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 transition-all duration-300 ${
        scrolled ? 'bg-dark/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial="initial"
      animate="animate"
      variants={headerVariants}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold neon-blue">
          Portfolio
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link 
                  href={`#${link.id}`} 
                  className="text-light hover:text-primary transition-colors relative group"
                >
                  {link.title}
                  <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="text-light p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 top-16 bg-dark z-40 p-4"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <ul className="flex flex-col space-y-4 p-4">
              {navLinks.map((link) => (
                <motion.li key={link.id} variants={menuItemVariants}>
                  <Link
                    href={`#${link.id}`}
                    className="text-xl py-2 block text-light hover:text-primary transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.title}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
