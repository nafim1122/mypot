'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import { skills } from '@/constants';

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section 
      id="about" 
      className="py-20 bg-dark"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <SectionHeading
          title="About Me"
          subtitle="Get to know me and my technical skills"
        />
        
        <div className="flex flex-col lg:flex-row gap-10 mt-12">
          {/* Left Column - Image & Bio */}
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              {/* Profile Image with 3D-like frame */}
              <div className="relative w-full max-w-md mx-auto aspect-square overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-xl" />
                
                <div className="absolute inset-1 bg-dark-light rounded-xl overflow-hidden">
                  <Image
                    src="/assets/images/profile.jpg" 
                    alt="Developer Profile"
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-xl" />
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-secondary/10 rounded-full blur-xl" />
              </div>
              
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary opacity-30 blur-sm rounded-xl" />
            </div>
            
            {/* Bio */}
            <div className="mt-8 p-6 bg-dark-light rounded-xl">
              <h3 className="text-2xl font-bold mb-4 neon-blue">Who I Am</h3>
              <p className="text-light/80 mb-4">
                I am a passionate Full Stack Developer with over 5 years of experience building 
                modern web applications. I specialize in creating immersive digital experiences 
                using cutting-edge technologies.
              </p>
              <p className="text-light/80">
                My journey in software development began with a curiosity about how digital products 
                work and has evolved into a career focused on crafting elegant solutions to complex problems. 
                I love bringing ideas to life through code.
              </p>
            </div>
          </motion.div>
          
          {/* Right Column - Skills */}
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="p-6 bg-dark-light rounded-xl h-full">
              <h3 className="text-2xl font-bold mb-6 neon-purple">Technical Skills</h3>
              
              <div className="space-y-8">
                {skills.map((category, index) => (
                  <div key={index}>
                    <h4 className="text-xl font-semibold mb-3">{category.name}</h4>
                    <div className="flex flex-wrap gap-3">
                      {category.skills.map((skill, i) => (
                        <motion.div
                          key={i}
                          className="px-3 py-2 bg-dark rounded-lg border border-primary/20 text-sm"
                          whileHover={{ scale: 1.05, borderColor: 'rgba(14, 165, 233, 0.6)' }}
                          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={isInView ? { 
                            opacity: 1, 
                            y: 0,
                            transition: { delay: 0.4 + (i * 0.05) }
                          } : { opacity: 0, y: 20 }}
                        >
                          {skill}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
