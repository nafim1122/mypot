'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import ProjectCard from '@/components/ui/ProjectCard';
import Button from '@/components/ui/Button';
import { projects } from '@/constants';

const Projects = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  
  // Filter featured projects for the main display
  const featuredProjects = projects.filter(project => project.featured);
  // Other projects
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section 
      id="projects" 
      className="py-20 bg-dark-light"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <SectionHeading
          title="My Projects"
          subtitle="Check out some of my recent work"
        />
        
        {/* Featured Projects - larger display */}
        <div className="mt-12 mb-16">
          <h3 className="text-xl font-bold mb-8 text-center">Featured Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  tags={project.tags}
                  source={project.source}
                  live={project.live}
                  index={index}
                />
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Other Projects - compact display */}
        {otherProjects.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-8 text-center">More Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-dark rounded-lg border border-primary/10 hover:border-primary/30 transition-colors"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                  whileHover={{ y: -5 }}
                >
                  <h4 className="text-lg font-semibold mb-2">{project.title}</h4>
                  <p className="text-light/70 text-sm mb-3 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs py-1 px-2 rounded-full bg-dark-light text-primary/80"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-xs py-1 px-2">+{project.tags.length - 3}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button href={project.live} size="sm" variant="primary" isExternal>
                      Demo
                    </Button>
                    <Button href={project.source} size="sm" variant="outline" isExternal>
                      Code
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {/* GitHub Button */}
        <motion.div 
          className="mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Button 
            href="https://github.com/yourusername" 
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

export default Projects;
