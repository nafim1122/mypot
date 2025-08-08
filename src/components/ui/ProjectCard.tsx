'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from './Button';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  source: string;
  live: string;
  index?: number;
}

const ProjectCard = ({
  title,
  description,
  image,
  tags,
  source,
  live,
  index = 0,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Add stagger effect to cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <motion.div
      className="relative bg-dark-light rounded-xl overflow-hidden shadow-lg transform transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      whileHover={{ 
        y: -10,
        boxShadow: '0 20px 25px -5px rgba(14, 165, 233, 0.1), 0 10px 10px -5px rgba(139, 92, 246, 0.04)'
      }}
    >
      {/* Project Image */}
      <div className="w-full h-48 relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className={`object-cover transition-all duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-70" />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-light/80 text-sm mb-4">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.slice(0, 4).map((tag, i) => (
            <span
              key={i}
              className="text-xs py-1 px-2 rounded-full bg-dark text-primary border border-primary/30"
            >
              {tag}
            </span>
          ))}
          {tags.length > 4 && (
            <span className="text-xs py-1 px-2 rounded-full bg-dark text-secondary">
              +{tags.length - 4}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button href={live} size="sm" variant="primary" isExternal>
            Live Demo
          </Button>
          <Button href={source} size="sm" variant="outline" isExternal>
            GitHub
          </Button>
        </div>
      </div>

      {/* Glowing corner effect */}
      <div 
        className="absolute -top-10 -right-10 w-20 h-20 bg-primary opacity-30 rounded-full blur-xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.4 : 0.1,
        }}
      />
    </motion.div>
  );
};

export default ProjectCard;
