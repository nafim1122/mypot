'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroObject from '@/components/3d/HeroObject';
import Button from '@/components/ui/Button';

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  // Fix hydration issues with 3D content
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark to-dark-light pointer-events-none" />
      
      <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-between">
        {/* Text Content */}
        <motion.div 
          className="text-center md:text-left z-10 md:w-1/2 mb-10 md:mb-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="neon-blue">Zonaid Hossain</span> <br />
            <span className="neon-purple">Nafim</span>
          </motion.h1>
          
          <motion.h2
            className="text-2xl md:text-3xl font-medium mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="text-primary">Full Stack Developer | AI Enthusiast</span>
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-light/80 mb-8 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Creating innovative digital solutions with modern technologies.
            Specializing in full-stack development with expertise in React, 
            Node.js, and competitive programming.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button href="#projects" size="lg">
              View My Work
            </Button>
            <Button href="#contact" variant="outline" size="lg">
              Contact Me
            </Button>
          </motion.div>
        </motion.div>
        
        {/* 3D Object */}
        {mounted && (
          <motion.div 
            className="relative w-full md:w-1/2 h-[400px] md:h-[500px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <HeroObject />
          </motion.div>
        )}
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <p className="text-light/50 text-sm mb-2">Scroll Down</p>
        <div className="w-5 h-10 border-2 border-light/20 rounded-full flex justify-center">
          <motion.div 
            className="w-1.5 h-1.5 bg-primary rounded-full mt-1"
            animate={{
              y: [0, 15, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
