'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { setupScene, createParticles } from '@/utils/3d';

interface SceneProps {
  className?: string;
}

const Scene = ({ className = '' }: SceneProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<{ cleanup: () => void } | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Setup scene
    const { scene, camera, renderer, cleanup } = setupScene(canvasRef.current);
    sceneRef.current = { cleanup };

    // Add particles
    const particles = createParticles(scene);

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      if (particles) {
        particles.rotation.x += 0.0003;
        particles.rotation.y += 0.0005;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (sceneRef.current) {
        sceneRef.current.cleanup();
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed inset-0 -z-10 ${className}`} 
    />
  );
};

export default Scene;
