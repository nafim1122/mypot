'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
  Environment, 
  Float,
  Text,
  Html,
  Preload
} from '@react-three/drei';
import * as THREE from 'three';
import { Raycaster, Vector3, Group, Points } from 'three';
import { gsap } from 'gsap';
import { projects } from '@/constants';

interface ProjectModelProps {
  project: {
    id: string;
    title: string;
    tags: string[];
    modelType: string;
    color: string;
    hoverColor: string;
  };
  index: number;
  onClick: (id: string) => void;
  isActive: boolean;
  position?: [number, number, number];
}

// Model for each project
const ProjectModel = ({ 
  project, 
  index, 
  onClick, 
  isActive, 
  position = [0, 0, 0]
}: ProjectModelProps) => {
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  
  // Replace with your actual model path or use placeholder shapes
  // const { scene } = useGLTF(project.modelPath || '/models/placeholder.glb');
  
  useEffect(() => {
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, {
        x: hovered ? 1.1 : 1,
        y: hovered ? 1.1 : 1,
        z: hovered ? 1.1 : 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  }, [hovered]);

  // Calculate position based on index
  const modelPosition: [number, number, number] = [
    position[0] + (index % 3 - 1) * 3,
    position[1],
    position[2] + Math.floor(index / 3) * 3
  ];

  return (
    <group
      ref={groupRef}
      position={modelPosition}
      onClick={(e) => {
        e.stopPropagation();
        onClick(project.id);
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Placeholder model - replace with your actual model */}
      <Float
        speed={1.5} 
        rotationIntensity={0.2}
        floatIntensity={0.5}
        floatingRange={[0, 0.5]}
      >
        <mesh castShadow receiveShadow>
          {project.modelType === 'cube' ? (
            <boxGeometry args={[1.5, 1.5, 1.5]} />
          ) : project.modelType === 'sphere' ? (
            <sphereGeometry args={[1, 32, 32]} />
          ) : (
            <torusKnotGeometry args={[0.8, 0.35, 100, 16]} />
          )}
          <meshStandardMaterial
            color={hovered ? project.hoverColor || '#0ea5e9' : project.color || '#8b5cf6'}
            metalness={0.5}
            roughness={0.3}
            emissive={hovered ? project.hoverColor || '#0ea5e9' : '#000000'}
            emissiveIntensity={hovered ? 0.5 : 0}
          />
        </mesh>

        {/* Project title */}
        <Text
          position={[0, -1.2, 0]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#000000"
          visible={hovered || isActive}
        >
          {project.title}
        </Text>

        {/* Project tag labels */}
        {hovered && (
          <Html
            position={[0, 1.5, 0]}
            center
            distanceFactor={10}
          >
            <div className="bg-dark/80 backdrop-blur-sm p-2 rounded-md border border-primary/30">
              <div className="flex flex-wrap gap-1 justify-center">
                {project.tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs py-0.5 px-1.5 rounded-full bg-primary/20 text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Html>
        )}
      </Float>
    </group>
  );
};

interface CameraControllerProps {
  activeProject: string | null;
  setActiveProject: (id: string | null) => void;
  defaultPosition?: [number, number, number];
}

// Main camera controller with smooth animations
const CameraController = ({
  activeProject,
  setActiveProject,
  defaultPosition = [0, 0, 10]
}: CameraControllerProps) => {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  
  // Reset camera position when deselecting a project
  const resetCamera = useCallback(() => {
    if (!controlsRef.current) return;
    
    gsap.to(camera.position, {
      x: defaultPosition[0],
      y: defaultPosition[1],
      z: defaultPosition[2],
      duration: 1.5,
      ease: 'power3.inOut',
      onComplete: () => {
        if (controlsRef.current) {
          controlsRef.current.reset();
          controlsRef.current.update();
        }
      }
    });
    
    setActiveProject(null);
  }, [camera, defaultPosition, setActiveProject]);

  // Handle back button click
  const handleBackClick = useCallback(() => {
    resetCamera();
  }, [resetCamera]);

  // Add global click handler to detect empty space clicks
  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      // Check if clicking on the canvas but not on any project model
      const target = event.target as HTMLElement;
      if (target.tagName === 'CANVAS' && activeProject) {
        resetCamera();
      }
    };
    
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, [activeProject, resetCamera]);

  return (
    <>
      <OrbitControls 
        ref={controlsRef}
        enableZoom={true}
        enablePan={false}
        enableRotate={true}
        minDistance={5}
        maxDistance={20}
        minPolarAngle={Math.PI / 6} // Limit vertical rotation
        maxPolarAngle={Math.PI / 2}
        dampingFactor={0.05}
        rotateSpeed={0.5}
        zoomSpeed={0.8}
      />
      
      {/* Back button when viewing a project */}
      {activeProject && (
        <Html position={[-5, 3, 0]}>
          <button 
            onClick={handleBackClick}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
          >
            ← Back
          </button>
        </Html>
      )}
    </>
  );
};

interface ProjectPosition {
  x: number;
  y: number;
  z: number;
}

interface ProjectPositions {
  [key: string]: ProjectPosition;
}

interface SceneContentProps {
  onProjectSelect?: (projectId: string) => void;
}

// Scene content
const SceneContent = ({ onProjectSelect }: SceneContentProps) => {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const projectPositions = useRef<ProjectPositions>({});
  
  // Handle project click - animate camera to focus on project
  const handleProjectClick = useCallback((projectId: string) => {
    setActiveProject(projectId);
    
    // Call the external handler if provided
    if (onProjectSelect) {
      onProjectSelect(projectId);
    }
    
    if (projectPositions.current[projectId]) {
      const { camera } = useThree();
      const position = projectPositions.current[projectId];
      
      gsap.to(camera.position, {
        x: position.x + 3, // Offset for better viewing angle
        y: position.y + 1,
        z: position.z + 3,
        duration: 1.5,
        ease: 'power3.inOut'
      });
      
      // Look at the project
      const lookAt = new Vector3(position.x, position.y, position.z);
      gsap.to(camera.position, {
        onUpdate: () => camera.lookAt(lookAt),
        duration: 1.5
      });
    }
  }, [onProjectSelect]);
  
  // Store project positions for camera animations
  useEffect(() => {
    projects.forEach((project, index) => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      projectPositions.current[project.id] = {
        x: (col - 1) * 3,
        y: 0,
        z: row * 3
      };
    });
  }, []);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />
      <CameraController 
        activeProject={activeProject}
        setActiveProject={setActiveProject}
        defaultPosition={[0, 0, 10]}
      />
      
      {/* Scene lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#0ea5e9" />
      <pointLight position={[5, -5, 5]} intensity={0.5} color="#8b5cf6" />
      
      {/* Background environment */}
      <Environment preset="night" />
      
      {/* Project models */}
      {projects.map((project, index) => (
        <ProjectModel 
          key={project.id}
          project={project} 
          index={index}
          onClick={handleProjectClick}
          isActive={activeProject === project.id}
        />
      ))}
      
      {/* Particles background */}
      <Particles />
      
      <Preload all />
    </>
  );
};

// Background particles
const Particles = () => {
  const points = useRef<THREE.Points>(null!);
  
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x += 0.0003;
      points.current.rotation.y += 0.0005;
    }
  });

  const count = 3000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    // Position
    positions[i3] = (Math.random() - 0.5) * 30;
    positions[i3 + 1] = (Math.random() - 0.5) * 30;
    positions[i3 + 2] = (Math.random() - 0.5) * 30;

    // Color - blend between blue and purple
    const mixFactor = Math.random();
    colors[i3] = mixFactor * 0.05 + (1 - mixFactor) * 0.54;      // R
    colors[i3 + 1] = mixFactor * 0.65 + (1 - mixFactor) * 0.36;  // G
    colors[i3 + 2] = mixFactor * 0.93 + (1 - mixFactor) * 0.96;  // B
  }

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

// Scroll-based camera movement
const ScrollControls = () => {
  const { camera } = useThree();
  const scrollTimeline = useRef<gsap.core.Timeline | null>(null);
  
  useEffect(() => {
    // Create a GSAP timeline for smoother animations
    scrollTimeline.current = gsap.timeline({
      paused: true,
      defaults: { ease: 'power2.out' }
    });
    
    // Add camera movements for different sections
    scrollTimeline.current
      // Starting position (Projects section)
      .set(camera.position, { x: 0, y: 0, z: 10 }, 0)
      // Move camera for About section
      .to(camera.position, { 
        y: -2, 
        z: 12,
        x: 3,
        duration: 2 
      }, 0.2)
      // Move camera for Experience section
      .to(camera.position, { 
        y: -4,
        x: -3, 
        z: 14, 
        duration: 2 
      }, 0.4)
      // Move camera for Contact section
      .to(camera.position, { 
        y: -6, 
        x: 0,
        z: 16, 
        duration: 2 
      }, 0.6);
      
    const handleScroll = () => {
      // Calculate scroll progress (0 to 1)
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      
      // Update the timeline based on scroll position
      if (scrollTimeline.current) {
        scrollTimeline.current.progress(scrollProgress);
      }
      
      // Optional: rotate camera slightly based on mouse position
      const mouseXEffect = (window.innerWidth / 2 - (window.mouseX || 0)) * 0.0002;
      const mouseYEffect = (window.innerHeight / 2 - (window.mouseY || 0)) * 0.0002;
      
      gsap.to(camera.rotation, {
        x: mouseYEffect,
        y: mouseXEffect,
        duration: 1
      });
    };
    
    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      window.mouseX = e.clientX;
      window.mouseY = e.clientY;
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (scrollTimeline.current) {
        scrollTimeline.current.kill();
      }
    };
  }, [camera]);
  
  return null;
};

interface InteractiveSceneProps {
  className?: string;
  onProjectSelect?: (projectId: string) => void;
}

// Main exported component
const InteractiveScene = ({ className = '', onProjectSelect }: InteractiveSceneProps) => {
  return (
    <div className={`w-full h-screen fixed inset-0 -z-10 ${className}`}>
      <Canvas shadows>
        <SceneContent onProjectSelect={onProjectSelect} />
        <ScrollControls />
      </Canvas>
    </div>
  );
};

export default InteractiveScene;
