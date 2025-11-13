'use client';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

interface Skill {
    name: string;
    category: 'frontend' | 'backend' | 'cloud' | 'devops';
    proficiency: number; // 0-1
    projects: string[];
}

interface SkillNode {
    skill: Skill;
    position: THREE.Vector3;
    mesh: THREE.Mesh;
    label: string;
}

const SkillConstellation = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const nodesRef = useRef<SkillNode[]>([]);
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
    const raycasterRef = useRef(new THREE.Raycaster());
    const mouseRef = useRef(new THREE.Vector2());

    const skills: Skill[] = [
        // Frontend Skills
        { name: 'React', category: 'frontend', proficiency: 0.95, projects: ['Job Autofill', 'E-Commerce'] },
        { name: 'TypeScript', category: 'frontend', proficiency: 0.9, projects: ['All Projects'] },
        { name: 'Tailwind CSS', category: 'frontend', proficiency: 0.9, projects: ['All Projects'] },
        { name: 'Next.js', category: 'frontend', proficiency: 0.85, projects: ['Portfolio', 'E-Commerce'] },
        { name: 'Framer Motion', category: 'frontend', proficiency: 0.85, projects: ['Portfolio'] },
        { name: 'D3.js', category: 'frontend', proficiency: 0.7, projects: ['Dashboard', 'News Agg'] },
        
        // Backend Skills
        { name: 'Node.js', category: 'backend', proficiency: 0.9, projects: ['Job Autofill', 'Chatbot'] },
        { name: 'Spring Boot', category: 'backend', proficiency: 0.85, projects: ['E-Commerce', 'Saayam'] },
        { name: 'Python', category: 'backend', proficiency: 0.8, projects: ['News Agg', 'DevOps'] },
        { name: 'PostgreSQL', category: 'backend', proficiency: 0.85, projects: ['E-Commerce', 'Dashboard'] },
        { name: 'MongoDB', category: 'backend', proficiency: 0.8, projects: ['Job Autofill', 'News Agg'] },
        { name: 'REST APIs', category: 'backend', proficiency: 0.9, projects: ['All Projects'] },
        { name: 'GraphQL', category: 'backend', proficiency: 0.7, projects: ['E-Commerce'] },
        { name: 'Kafka', category: 'backend', proficiency: 0.8, projects: ['E-Commerce', 'Saayam'] },
        
        // Cloud & DevOps Skills
        { name: 'AWS', category: 'cloud', proficiency: 0.85, projects: ['Job Autofill', 'Saayam'] },
        { name: 'Docker', category: 'cloud', proficiency: 0.85, projects: ['E-Commerce', 'DevOps'] },
        { name: 'Kubernetes', category: 'cloud', proficiency: 0.8, projects: ['E-Commerce', 'DevOps'] },
        { name: 'Redis', category: 'cloud', proficiency: 0.75, projects: ['E-Commerce', 'Dashboard'] },
        
        // DevOps Skills
        { name: 'Git', category: 'devops', proficiency: 0.95, projects: ['All Projects'] },
        { name: 'CI/CD', category: 'devops', proficiency: 0.85, projects: ['DevOps', 'E-Commerce'] },
        { name: 'Terraform', category: 'devops', proficiency: 0.75, projects: ['DevOps'] },
        { name: 'Prometheus', category: 'devops', proficiency: 0.7, projects: ['DevOps', 'Dashboard'] },
    ];

    const categoryColors = {
        frontend: { color: 0x3A86FF, hex: '#3A86FF', label: 'Frontend' },
        backend: { color: 0x10B981, hex: '#10B981', label: 'Backend' },
        cloud: { color: 0xF59E0B, hex: '#F59E0B', label: 'Cloud' },
        devops: { color: 0xA855F7, hex: '#A855F7', label: 'DevOps' },
    };

    useEffect(() => {
        if (!canvasRef.current) return;

        // Scene Setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0D0C1D);
        sceneRef.current = scene;

        // Camera Setup
        const camera = new THREE.PerspectiveCamera(
            75,
            canvasRef.current.clientWidth / canvasRef.current.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 35;

        // Renderer Setup
        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            alpha: true,
        });
        renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        rendererRef.current = renderer;

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x00F6FF, 0.8);
        pointLight.position.set(20, 20, 20);
        scene.add(pointLight);

        // Create Central Node (Aditya)
        const centralGeometry = new THREE.IcosahedronGeometry(1.5, 4);
        const centralMaterial = new THREE.MeshPhongMaterial({
            color: 0x00F6FF,
            emissive: 0x00F6FF,
            emissiveIntensity: 0.3,
        });
        const centralMesh = new THREE.Mesh(centralGeometry, centralMaterial);
        scene.add(centralMesh);

        // Create Skill Nodes
        const nodes: SkillNode[] = [];
        const skillsPerCategory = skills.reduce((acc, skill) => {
            if (!acc[skill.category]) acc[skill.category] = [];
            acc[skill.category].push(skill);
            return acc;
        }, {} as Record<string, Skill[]>);

        let nodeIndex = 0;
        Object.entries(skillsPerCategory).forEach(([category, categorySkills]) => {
            const categoryColor = categoryColors[category as keyof typeof categoryColors];
            const skillsInCategory = categorySkills.length;
            const radiusPerCategory = 12 + Object.keys(skillsPerCategory).indexOf(category) * 5;

            categorySkills.forEach((skill, idx) => {
                const angle = (idx / skillsInCategory) * Math.PI * 2;
                const x = Math.cos(angle) * radiusPerCategory;
                const y = Math.sin(angle) * radiusPerCategory;
                const z = (Math.random() - 0.5) * 5;

                // Node Size based on Proficiency
                const nodeSize = 0.6 + skill.proficiency * 0.8;

                // Create Geometry
                const geometry = new THREE.IcosahedronGeometry(nodeSize, 3);
                const material = new THREE.MeshPhongMaterial({
                    color: categoryColor.color,
                    emissive: categoryColor.color,
                    emissiveIntensity: 0.2,
                });
                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(x, y, z);
                mesh.userData = { skillName: skill.name, originalEmissive: 0.2, proficiency: skill.proficiency };

                scene.add(mesh);

                nodes.push({
                    skill,
                    position: new THREE.Vector3(x, y, z),
                    mesh,
                    label: skill.name,
                });

                // Connection Line to Center
                const lineGeometry = new THREE.BufferGeometry();
                const lineVertices = new Float32Array([0, 0, 0, x, y, z]);
                lineGeometry.setAttribute('position', new THREE.BufferAttribute(lineVertices, 3));

                const lineMaterial = new THREE.LineBasicMaterial({
                    color: categoryColor.color,
                    transparent: true,
                    opacity: 0.2,
                });
                const line = new THREE.Line(lineGeometry, lineMaterial);
                scene.add(line);
            });
        });

        nodesRef.current = nodes;

        // Mouse Interaction
        const onMouseMove = (event: MouseEvent) => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            mouseRef.current.x = ((event.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
            mouseRef.current.y = -((event.clientY - rect.top) / canvas.clientHeight) * 2 + 1;

            raycasterRef.current.setFromCamera(mouseRef.current, camera);
            const intersects = raycasterRef.current.intersectObjects(
                nodes.map((n) => n.mesh)
            );

            // Reset all nodes
            nodes.forEach((node) => {
                (node.mesh.material as THREE.MeshPhongMaterial).emissiveIntensity = node.mesh.userData.originalEmissive;
            });

            if (intersects.length > 0) {
                const hitObject = intersects[0].object as THREE.Mesh;
                if (hitObject.material) {
                    (hitObject.material as THREE.MeshPhongMaterial).emissiveIntensity = 0.6;
                }
                setHoveredSkill(hitObject.userData.skillName);
            } else {
                setHoveredSkill(null);
            }
        };

        const onCanvasClick = (event: MouseEvent) => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            mouseRef.current.x = ((event.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
            mouseRef.current.y = -((event.clientY - rect.top) / canvas.clientHeight) * 2 + 1;

            raycasterRef.current.setFromCamera(mouseRef.current, camera);
            const intersects = raycasterRef.current.intersectObjects(
                nodes.map((n) => n.mesh)
            );

            if (intersects.length > 0) {
                const hitObject = intersects[0].object;
                const skillName = hitObject.userData.skillName;
                const skill = skills.find((s) => s.name === skillName);
                if (skill) setSelectedSkill(skill);
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        canvasRef.current.addEventListener('click', onCanvasClick);

        // Animation Loop
        let animationId: number;
        const animate = () => {
            animationId = requestAnimationFrame(animate);

            // Rotate Central Node
            centralMesh.rotation.x += 0.001;
            centralMesh.rotation.y += 0.002;

            // Orbit Skill Nodes
            nodes.forEach((node, idx) => {
                const speed = 0.001 + (idx * 0.0002);
                const orbitRadius = Math.sqrt(node.position.x ** 2 + node.position.y ** 2);
                const angle = Math.atan2(node.position.y, node.position.x) + speed;

                node.mesh.position.x = Math.cos(angle) * orbitRadius;
                node.mesh.position.y = Math.sin(angle) * orbitRadius;

                // Subtle bobbing
                node.mesh.position.z += Math.sin(Date.now() * 0.001 + idx) * 0.0005;

                // Glow pulse
                const pulse = Math.sin(Date.now() * 0.002 + idx) * 0.2 + 0.5;
                (node.mesh.material as THREE.MeshPhongMaterial).emissiveIntensity =
                    (node.mesh.userData.originalEmissive || 0.2) + pulse * 0.1;
            });

            renderer.render(scene, camera);
        };
        animate();

        // Handle Resize
        const handleResize = () => {
            if (!canvasRef.current) return;
            const width = canvasRef.current.clientWidth;
            const height = canvasRef.current.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', handleResize);
            canvasRef.current?.removeEventListener('click', onCanvasClick);
            cancelAnimationFrame(animationId);
            renderer.dispose();
        };
    }, []);

    return (
        <section id="skills" className="py-20 px-4 bg-background relative overflow-hidden">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto mb-12 relative z-10"
            >
                <h2 className="text-4xl sm:text-5xl font-bold text-text mb-4">Technical Skills</h2>
                <p className="text-lg text-text-muted">
                    22+ technologies organized by expertise and organized by domain. Click any skill to see related projects.
                </p>
            </motion.div>

            <div className="max-w-6xl mx-auto relative">
                {/* 3D Canvas */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative h-96 sm:h-screen max-h-[600px] rounded-lg overflow-hidden border border-cyan-400/30 shadow-2xl shadow-cyan-400/20"
                >
                    <canvas ref={canvasRef} className="w-full h-full" />

                    {/* Center Label */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <motion.div
                            animate={{
                                scale: [1, 1.05, 1],
                                opacity: [0.6, 1, 0.6],
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="text-center"
                        >
                            <p className="text-cyan-400 font-bold text-lg">Aditya</p>
                            <p className="text-text-muted text-sm">Full Stack Engineer</p>
                        </motion.div>
                    </div>

                    {/* Hover Label */}
                    <AnimatePresence>
                        {hoveredSkill && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="absolute top-8 left-1/2 -translate-x-1/2 bg-black/90 border border-cyan-400/50 px-4 py-2 rounded-lg pointer-events-none z-20"
                            >
                                <p className="text-cyan-400 font-semibold text-sm">{hoveredSkill}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Category Legend */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                    {Object.entries(categoryColors).map(([key, { color, label }]) => (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: Object.keys(categoryColors).indexOf(key) * 0.1 }}
                            className="flex items-center gap-3 p-3 bg-slate-900/50 border border-cyan-400/20 rounded-lg"
                        >
                            <div
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: categoryColors[key as keyof typeof categoryColors].hex }}
                            ></div>
                            <span className="text-sm text-text-muted">{label}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Skill Details Panel */}
                <AnimatePresence>
                    {selectedSkill && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="mt-8 p-6 bg-gradient-to-r from-slate-900/50 to-slate-800/50 border border-cyan-400/30 rounded-lg"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-text mb-2">{selectedSkill.name}</h3>
                                    <p className="text-sm text-cyan-400 font-semibold capitalize">
                                        {categoryColors[selectedSkill.category].label}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelectedSkill(null)}
                                    className="text-text-muted hover:text-text transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Proficiency Bar */}
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-text-muted">Proficiency</span>
                                    <span className="text-sm font-semibold text-cyan-400">
                                        {Math.round(selectedSkill.proficiency * 100)}%
                                    </span>
                                </div>
                                <div className="w-full bg-black/30 rounded-full h-2 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${selectedSkill.proficiency * 100}%` }}
                                        transition={{ duration: 0.8, ease: 'easeOut' }}
                                        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                                    ></motion.div>
                                </div>
                            </div>

                            {/* Related Projects */}
                            <div>
                                <h4 className="text-sm font-bold text-text mb-3">Used In Projects</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedSkill.projects.map((project) => (
                                        <motion.span
                                            key={project}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 px-3 py-1 rounded-full text-xs font-medium"
                                        >
                                            {project}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Helper Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="text-center mt-8 text-sm text-text-muted"
                >
                    <p>💡 Hover over nodes to see skill names, click to view details and related projects</p>
                </motion.div>
            </div>
        </section>
    );
};

export default SkillConstellation;
