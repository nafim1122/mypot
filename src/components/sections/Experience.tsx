'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { experience, education } from '@/constants';

// Define types for our data
type ExperienceItem = {
  title: string;
  company: string;
  location: string;
  date: string;
  description: string;
  skills: string[];
};

type EducationItem = {
  degree: string;
  institution: string;
  location: string;
  date: string;
  description: string;
};

const Experience = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');

  // Cast the data to the correct types
  const experienceData = experience as ExperienceItem[];
  const educationData = education as EducationItem[];
  
  // Select the correct data based on active tab
  const timelineData = activeTab === 'experience' ? experienceData : educationData;

  return (
    <section 
      id="experience" 
      className="py-20 bg-dark"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Experience & Education"
          subtitle="My professional journey and academic background"
        />
        
        {/* Tab Selector */}
        <div className="flex justify-center mt-8 mb-12">
          <div className="inline-flex bg-dark-light rounded-lg p-1">
            <button
              className={`py-2 px-6 rounded-lg transition-all ${
                activeTab === 'experience'
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'text-light/70 hover:text-light'
              }`}
              onClick={() => setActiveTab('experience')}
            >
              Experience
            </button>
            <button
              className={`py-2 px-6 rounded-lg transition-all ${
                activeTab === 'education'
                  ? 'bg-gradient-to-r from-primary to-secondary text-white'
                  : 'text-light/70 hover:text-light'
              }`}
              onClick={() => setActiveTab('education')}
            >
              Education
            </button>
          </div>
        </div>
        
        {/* 3D Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Center line */}
          <motion.div
            className="absolute left-1/2 top-0 w-1 bg-gradient-to-b from-primary to-secondary h-full transform -translate-x-1/2"
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : { height: 0 }}
            transition={{ duration: 1.2 }}
          />
          
          {/* Timeline Items */}
          <div className="relative">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                className={`mb-12 flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                } relative`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {/* Content Box */}
                <motion.div 
                  className={`w-5/12 p-5 bg-dark-light rounded-lg border border-primary/10 shadow-lg relative z-10 ${
                    index % 2 === 0 ? 'text-right mr-auto' : 'ml-auto'
                  }`}
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: '0 0 15px rgba(14, 165, 233, 0.15)' 
                  }}
                >
                  <h3 className="text-lg md:text-xl font-bold text-primary mb-1">
                    {activeTab === 'experience' 
                      ? (item as ExperienceItem).title 
                      : (item as EducationItem).degree}
                  </h3>
                  
                  <h4 className="text-sm md:text-base font-medium text-light mb-2">
                    {activeTab === 'experience' 
                      ? (item as ExperienceItem).company 
                      : (item as EducationItem).institution}
                  </h4>
                  
                  <p className="text-xs text-light/60 mb-2">
                    {item.location} | {item.date}
                  </p>
                  
                  <p className="text-sm text-light/80">
                    {item.description}
                  </p>
                  
                  {activeTab === 'experience' && (
                    <div className="flex flex-wrap gap-1 mt-3 justify-end">
                      {(item as ExperienceItem).skills.map((skill: string, i: number) => (
                        <span
                          key={i}
                          className="text-xs py-0.5 px-2 bg-dark rounded-full text-primary/80"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
                
                {/* Center Point */}
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <motion.div
                    className="w-5 h-5 rounded-full bg-dark border-2 border-primary z-20"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                  />
                  <motion.div 
                    className="absolute w-10 h-10 rounded-full bg-primary/20 animate-ping"
                    style={{ animationDuration: '3s' }}
                  />
                </div>
                
                {/* Date on opposite side */}
                <div 
                  className={`w-5/12 text-sm font-medium ${
                    index % 2 !== 0 ? 'text-right pr-8' : 'pl-8'
                  }`}
                >
                  {activeTab === 'experience' ? (
                    <span className="text-secondary">{item.date}</span>
                  ) : (
                    <span className="text-secondary">{item.date}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
