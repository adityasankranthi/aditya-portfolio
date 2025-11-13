'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const globeRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(width, height);
    renderer.setClearColor(0x0a0a0a, 0);
    containerRef.current.appendChild(renderer.domElement);
    sceneRef.current = scene;

    camera.position.z = 2.5;

    // Create globe
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    
    // Create canvas texture for globe
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;

    // Background - dark blue
    ctx.fillStyle = '#0a1628';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw continents - slate gray
    ctx.fillStyle = '#2d3e50';
    
    // Simple continents representation
    const continents = [
      { x: 300, y: 400, w: 400, h: 300 }, // North America
      { x: 900, y: 350, w: 350, h: 250 }, // Europe
      { x: 1200, y: 450, w: 300, h: 200 }, // Asia
      { x: 100, y: 600, w: 250, h: 150 }, // South America
      { x: 1300, y: 700, w: 200, h: 200 }, // Australia
      { x: 800, y: 650, w: 150, h: 100 }, // Africa
    ];

    continents.forEach(cont => {
      ctx.beginPath();
      ctx.ellipse(cont.x, cont.y, cont.w, cont.h, Math.random() * 0.5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Add grid lines
    ctx.strokeStyle = 'rgba(93, 109, 126, 0.3)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 256) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 256) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshPhongMaterial({ map: texture });
    const globe = new THREE.Mesh(geometry, material);
    globeRef.current = globe;
    scene.add(globe);

    // Add lighting
    const light = new THREE.DirectionalLight(0xffffff, 0.8);
    light.position.set(5, 3, 5);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (globeRef.current) {
        globeRef.current.rotation.y += 0.0005;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section className="relative h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black overflow-hidden">
      {/* Globe Canvas */}
      <div ref={containerRef} className="absolute inset-0 opacity-60" />

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-4xl"
        >
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Full Stack
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-slate-400 bg-clip-text text-transparent">
              Software Engineer
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Crafting scalable systems with React, Next.js, Node.js, and cloud infrastructure. 
            Building products that matter.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              View My Work
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-blue-400 text-blue-400 font-semibold rounded-lg hover:bg-blue-400/10 transition-colors"
            >
              Get in Touch
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12 text-slate-400 text-sm"
          >
            <p>Scroll to explore</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-slate-400 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
