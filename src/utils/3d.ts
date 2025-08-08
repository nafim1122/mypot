import * as THREE from 'three';

interface ModelOptions {
  receiveShadow: boolean;
  castShadow: boolean;
}

// This creates a placeholder cube model for the 3D scene
export const loadGLTFModel = (
  scene: THREE.Scene,
  glbPath: string,
  options: ModelOptions = { receiveShadow: true, castShadow: true }
): { 
  createModel: () => THREE.Group; 
  removeModel: () => void;
} => {
  const { receiveShadow, castShadow } = options;
  let modelGroup: THREE.Group | null = null;
  
  // Function to create a placeholder model
  const createModel = (): THREE.Group => {
    // Create a placeholder model (a simple cube)
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ 
      color: 0x8b5cf6,
      emissive: 0x8b5cf6,
      emissiveIntensity: 0.2
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.castShadow = castShadow;
    cube.receiveShadow = receiveShadow;
    
    // Create a group to hold the cube
    const group = new THREE.Group();
    group.add(cube);
    group.name = 'placeholder-model';
    scene.add(group);
    
    // Store reference to the group
    modelGroup = group;
    
    return group;
  };
  
  // Function to remove the model from the scene
  const removeModel = (): void => {
    if (modelGroup) {
      scene.remove(modelGroup);
      modelGroup = null;
    }
  };
  
  return { createModel, removeModel };

  return { createModel, removeModel };
};

// Create a basic scene setup with lights
export const setupScene = (canvas: HTMLCanvasElement) => {
  // Create scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#0f172a'); // dark background

  // Create camera
  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 5);

  // Create renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  
  // Add lights
  const ambientLight = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, 10, 10);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
  
  const pointLight1 = new THREE.PointLight(0x0ea5e9, 1, 100); // blue
  pointLight1.position.set(5, 5, 5);
  scene.add(pointLight1);
  
  const pointLight2 = new THREE.PointLight(0x8b5cf6, 1, 100); // purple
  pointLight2.position.set(-5, -5, 5);
  scene.add(pointLight2);

  // Window resize handler
  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  window.addEventListener('resize', handleResize);

  return {
    scene,
    camera,
    renderer,
    cleanup: () => {
      window.removeEventListener('resize', handleResize);
      // Additional cleanup...
    },
  };
};

// Create animated particles
export const createParticles = (scene: THREE.Scene, count = 1000) => {
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    vertexColors: true,
    transparent: true,
  });

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i += 3) {
    // Position
    positions[i] = (Math.random() - 0.5) * 10;
    positions[i + 1] = (Math.random() - 0.5) * 10;
    positions[i + 2] = (Math.random() - 0.5) * 10;

    // Color
    const mixFactor = Math.random();
    // Blue to purple gradient
    colors[i] = mixFactor * 0.05 + (1 - mixFactor) * 0.54;  // R: 14 to 139
    colors[i + 1] = mixFactor * 0.65 + (1 - mixFactor) * 0.36;  // G: 165 to 92
    colors[i + 2] = mixFactor * 0.93 + (1 - mixFactor) * 0.96;  // B: 233 to 246
  }

  particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
  );
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particles = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particles);

  return particles;
};
