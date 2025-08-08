'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface HeroObjectProps {
  className?: string;
}

const HeroObject = ({ className = '' }: HeroObjectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setClearColor(0x000000, 0); // transparent background
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create torus geometry
    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 32);
    
    // Create shader material with glowing effect
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x0ea5e9) }, // primary blue
        color2: { value: new THREE.Color(0x8b5cf6) },  // secondary purple
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float time;
        
        void main() {
          vUv = uv;
          vPosition = position;
          
          // Add subtle vertex displacement
          vec3 newPosition = position;
          newPosition += normal * sin(position.x * 10.0 + time) * 0.05;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        
        void main() {
          // Create gradient from color1 to color2
          vec3 color = mix(color1, color2, sin(vUv.x * 3.141592653589 + time * 0.5) * 0.5 + 0.5);
          
          // Add pulsing glow
          float glow = sin(time * 0.5) * 0.2 + 0.8;
          
          // Add edge glow
          float edge = 0.05;
          float edgeGlow = smoothstep(0.5 - edge, 0.5, length(vUv - vec2(0.5)));
          
          gl_FragColor = vec4(color * glow, 1.0);
        }
      `,
      wireframe: false,
    });

    // Create mesh
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x0ea5e9, 1); // blue
    pointLight1.position.set(2, 2, 2);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 1); // purple
    pointLight2.position.set(-2, -2, 2);
    scene.add(pointLight2);

    // Animation loop
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      
      time += 0.01;
      if (material.uniforms) {
        material.uniforms.time.value = time;
      }

      // Rotate model
      torusKnot.rotation.x = time * 0.3;
      torusKnot.rotation.y = time * 0.2;
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      // Save a reference to the current container
      const currentContainer = containerRef.current;
      const currentRenderer = rendererRef.current;
      
      if (currentContainer && currentRenderer) {
        currentContainer.removeChild(currentRenderer.domElement);
      }
      
      // Dispose of resources
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      className={`w-full h-full ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    />
  );
};

export default HeroObject;
