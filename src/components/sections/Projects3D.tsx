'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { projects } from '@/constants';
import dynamic from 'next/dynamic';

// Define project type based on our projects data
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  source: string;
  live: string;
  featured?: boolean;
  modelType: string;
  color: string;
  hoverColor: string;
}

// Define props for the InteractiveScene component
interface InteractiveSceneProps {
  className?: string;
  onProjectSelect?: (projectId: string) => void;
}

// Dynamically import the InteractiveScene component to avoid SSR issues
const InteractiveScene = dynamic<InteractiveSceneProps>(
  () => import('@/components/3d/InteractiveScene'),
  { ssr: false }
);

const Projects3D = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const [showScene, setShowScene] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Load 3D scene after component mounts to ensure proper rendering
  useEffect(() => {
    setShowScene(true);
  }, []);

  const handleProjectDetails = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project as Project);
    }
  };

  return (
    <section 
      id="projects" 
      className="relative py-20"
      ref={ref}
    >
      {/* Fixed position 3D scene in the background */}
      {showScene && <InteractiveScene onProjectSelect={handleProjectDetails} />}
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          title="My Projects"
          subtitle="Interact with 3D models of my work"
        />
        
        <div className="mt-12 mb-16">
          <div className="text-center text-light/80 mb-8 max-w-2xl mx-auto">
            <p className="text-lg mb-4">
              Explore my projects in 3D! Click on any object to zoom in and view details.
            </p>
            <p>
              Use mouse or touch to rotate the view. Click the back button or empty space to return.
            </p>
          </div>
          
          {/* Project details card - shows when a project is selected */}
          {selectedProject && (
            <motion.div
              className="bg-dark/80 backdrop-blur-sm rounded-lg p-6 border border-primary/20 max-w-xl mx-auto mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>
              <p className="text-light/70 mb-4">{selectedProject.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProject.tags.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="text-xs py-1 px-2 rounded-full bg-primary/20 text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <Button href={selectedProject.live} size="md" variant="primary" isExternal>
                  View Demo
                </Button>
                <Button href={selectedProject.source} size="md" variant="outline" isExternal>
                  Source Code
                </Button>
              </div>
            </motion.div>
          )}
          
          {/* Project instructions - hide when a project is selected */}
          {!selectedProject && (
            <motion.div
              className="mt-24 text-center opacity-70 hover:opacity-100 transition-opacity"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex flex-col items-center">
                <svg className="w-8 h-8 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <span className="mt-2">Click on a project to view details</span>
              </div>
            </motion.div>
          )}
        </div>
        
        {/* GitHub Button */}
        <motion.div 
          className="mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Button 
            href="https://github.com/nafim1122" 
            variant="secondary"
            size="lg"
            isExternal
            icon={
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            }
          >
            View All Projects on GitHub
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects3D;
