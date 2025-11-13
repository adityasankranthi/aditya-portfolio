'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

interface DeskItem {
  id: string;
  name: string;
  position: [number, number, number];
  scale: [number, number, number];
  color: string;
  icon: string;
  type: 'frontend' | 'backend' | 'education' | 'leadership' | 'methodology';
  details: {
    title: string;
    description: string;
    highlights: string[];
  };
}

export default function DeskScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const [selectedItem, setSelectedItem] = useState<DeskItem | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const itemsRef = useRef<Map<string, THREE.Mesh>>(new Map());

  const deskItems: DeskItem[] = [
    {
      id: 'monitor',
      name: 'Monitor',
      position: [0, 1.5, -1],
      scale: [1.2, 0.8, 0.1],
      color: '#1e40af',
      icon: '🖥️',
      type: 'frontend',
      details: {
        title: 'Frontend Development',
        description: 'React, Angular, TypeScript, Responsive Design',
        highlights: [
          'Saayam: Reusable React component library (-25% dev time)',
          'Swecha: Real-time chat with Next.js & React',
          'Rome University: Angular SPA with lazy loading'
        ]
      }
    },
    {
      id: 'chrome',
      name: 'Chrome Extension',
      position: [0.8, 0.6, 0],
      scale: [0.3, 0.3, 0.3],
      color: '#dc2626',
      icon: '🔴',
      type: 'frontend',
      details: {
        title: 'Job Application Autofill & Tracker',
        description: 'Chrome extension with React/TypeScript frontend',
        highlights: [
          'Manifest v3 & Service Workers',
          'Content scripts for DOM manipulation',
          'Production-ready extension'
        ]
      }
    },
    {
      id: 'phone',
      name: 'Mobile Phone',
      position: [-0.8, 0.5, 0],
      scale: [0.2, 0.4, 0.08],
      color: '#7c3aed',
      icon: '📱',
      type: 'frontend',
      details: {
        title: 'Mobile & Responsive Design',
        description: 'React Native, Responsive Interfaces',
        highlights: [
          'React Native development',
          'Responsive Swecha chat system',
          'Mobile-first design approach'
        ]
      }
    },
    {
      id: 'headset',
      name: 'Headset',
      position: [1.3, 1.2, 0.3],
      scale: [0.3, 0.25, 0.3],
      color: '#059669',
      icon: '🎧',
      type: 'leadership',
      details: {
        title: 'Leadership & Support',
        description: 'IT Lead at University of Wisconsin-Milwaukee',
        highlights: [
          'Led 10 IT support analysts',
          '98% SLA compliance for 30K+ users',
          '20% faster incident resolution with automation'
        ]
      }
    },
    {
      id: 'books',
      name: 'Education',
      position: [-1.3, 1, 0.3],
      scale: [0.3, 0.6, 0.2],
      color: '#b91c1c',
      icon: '📚',
      type: 'education',
      details: {
        title: 'Education',
        description: 'Advanced degrees in Computer Science',
        highlights: [
          'MS Computer Science - UW Milwaukee (2023-2025)',
          'BS Internet & Communication - Rome Tor Vergata (2018-2022)'
        ]
      }
    },
    {
      id: 'stickies',
      name: 'Sticky Notes',
      position: [1.1, 1.7, -0.8],
      scale: [0.4, 0.4, 0.05],
      color: '#f59e0b',
      icon: '📌',
      type: 'methodology',
      details: {
        title: 'Methodologies',
        description: 'Agile, Scrum, Kanban',
        highlights: [
          'Agile/Scrum practices',
          'Sprint Planning & Code Reviews',
          'Pair Programming',
          'Continuous Integration'
        ]
      }
    },
    {
      id: 'cpu',
      name: 'Backend Languages',
      position: [-0.5, -0.3, 0.5],
      scale: [0.35, 0.35, 0.35],
      color: '#0369a1',
      icon: '⚙️',
      type: 'backend',
      details: {
        title: 'Core Backend Languages',
        description: 'Java, Python, Node.js',
        highlights: [
          'Spring Boot 3 microservices',
          'Node.js/Express backends',
          'Python automation scripts'
        ]
      }
    },
    {
      id: 'database',
      name: 'Database',
      position: [0.5, -0.5, -0.3],
      scale: [0.3, 0.5, 0.3],
      color: '#0ea5e9',
      icon: '🗄️',
      type: 'backend',
      details: {
        title: 'Databases & Optimization',
        description: 'PostgreSQL, MongoDB, MySQL',
        highlights: [
          'Query optimization (800ms → 450ms)',
          '40% API response improvement',
          'Database design & indexing'
        ]
      }
    },
    {
      id: 'cloud',
      name: 'Cloud',
      position: [-0.5, -0.7, 0.2],
      scale: [0.4, 0.4, 0.4],
      color: '#06b6d4',
      icon: '☁️',
      type: 'backend',
      details: {
        title: 'Cloud & Containerization',
        description: 'AWS, Azure, GCP, Docker, Kubernetes',
        highlights: [
          'AWS EC2, RDS, S3, Lambda, EKS',
          'Azure App Service, AKS',
          'Docker & Kubernetes orchestration'
        ]
      }
    }
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(width, height);
    renderer.setClearColor(0x0a0a0a, 1);
    containerRef.current.appendChild(renderer.domElement);
    sceneRef.current = scene;

    camera.position.set(0, 1, 3);
    camera.lookAt(0, 0.5, 0);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    // Create desk (simple plane)
    const deskGeometry = new THREE.PlaneGeometry(4, 2);
    const deskMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x44403c,
      roughness: 0.4,
      metalness: 0.1
    });
    const desk = new THREE.Mesh(deskGeometry, deskMaterial);
    desk.rotation.x = -Math.PI / 2;
    desk.position.y = 0;
    scene.add(desk);

    // Create background wall
    const wallGeometry = new THREE.PlaneGeometry(5, 4);
    const wallMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1e293b,
      roughness: 0.8
    });
    const wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.z = -2;
    wall.position.y = 1.5;
    scene.add(wall);

    // Create desk items
    deskItems.forEach((item) => {
      const geometry = new THREE.BoxGeometry(...item.scale);
      const material = new THREE.MeshStandardMaterial({
        color: item.color,
        roughness: 0.6,
        metalness: 0.4,
        emissive: 0x000000
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...item.position);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { id: item.id };
      scene.add(mesh);
      itemsRef.current.set(item.id, mesh);
    });

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Subtle rotation for items
      itemsRef.current.forEach((mesh, id) => {
        mesh.rotation.x += 0.003;
        mesh.rotation.y += 0.005;

        // Floating effect
        const item = deskItems.find(i => i.id === id);
        if (item) {
          mesh.position.y = item.position[1] + Math.sin(Date.now() * 0.0005) * 0.1;
        }

        // Glow on hover
        if (hoveredItem === id) {
          (mesh.material as THREE.MeshStandardMaterial).emissive.setHex(0x3b82f6);
          (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.5;
        } else {
          (mesh.material as THREE.MeshStandardMaterial).emissive.setHex(0x000000);
          (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0;
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    // Mouse interaction
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / width) * 2 - 1;
      mouseRef.current.y = -(event.clientY / height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(
        Array.from(itemsRef.current.values())
      );

      if (intersects.length > 0) {
        const hoveredId = (intersects[0].object as any).userData.id;
        setHoveredItem(hoveredId);
      } else {
        setHoveredItem(null);
      }
    };

    const handleClick = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / width) * 2 - 1;
      mouseRef.current.y = -(event.clientY / height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(
        Array.from(itemsRef.current.values())
      );

      if (intersects.length > 0) {
        const clickedId = (intersects[0].object as any).userData.id;
        const item = deskItems.find(i => i.id === clickedId);
        if (item) {
          setSelectedItem(item);
        }
      }
    };

    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        containerRef.current.removeEventListener('click', handleClick);
      }
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      animationId && cancelAnimationFrame(animationId);
    };
  }, [hoveredItem, deskItems]);

  return (
    <section className="w-full h-screen bg-black relative">
      <div ref={containerRef} className="w-full h-full" />

      {/* Info Panel */}
      <div className="absolute top-8 left-8 z-10 text-white max-w-sm">
        <h2 className="text-2xl font-bold mb-2">Interactive Desk</h2>
        <p className="text-slate-400 text-sm">
          Click on items to explore my experience
        </p>
        {hoveredItem && (
          <p className="text-blue-400 text-xs mt-2">
            Hover: Click to explore
          </p>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="bg-slate-900 border border-slate-700 rounded-lg p-8 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{selectedItem.details.title[0]}</span>
                <h3 className="text-2xl font-bold text-white">
                  {selectedItem.name}
                </h3>
              </div>

              <p className="text-slate-300 mb-4">
                {selectedItem.details.description}
              </p>

              <div className="space-y-2 mb-6">
                {selectedItem.details.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex gap-2 text-sm text-slate-300">
                    <span className="text-blue-400 flex-shrink-0">•</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
