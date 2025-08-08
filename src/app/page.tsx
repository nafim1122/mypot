'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Projects3D from '@/components/sections/Projects3D';
import Experience from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';
import CustomCursor from '@/components/ui/CustomCursor';
import MusicToggle from '@/components/ui/MusicToggle';

export default function Home() {
  // State to track whether we're on client-side to avoid hydration issues
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-dark text-light">
      {mounted && <CustomCursor />}
      {mounted && <MusicToggle />}
      <Header />
      <main>
        <Hero />
        <About />
        <Projects3D />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
