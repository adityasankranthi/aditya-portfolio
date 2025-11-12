'use client';
import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import type { Project } from '../types';

// --- Data (modalImageUrl is now used) ---
const projectsData: Project[] = [
    {
        title: 'EasyApply.ai',
        description: 'AI-powered platform to automate job applications.',
        longDescription: 'EasyApply.ai is a comprehensive tool designed to streamline the job application process. It uses AI to autofill applications, tailor resumes, and track submissions, helping users apply to hundreds of jobs efficiently.',
        logoUrl: '/EasyApply.svg',
        projectUrl: '#',
        imageUrl: '', // Not used in card
        modalImageUrl: '/easyapply-details.png' // Used in modal
    },
    {
        title: 'Schools Daily MediaLabs',
        description: 'Custom web solutions for educational institutions.',
        longDescription: 'Daily MediaLabs provides bespoke websites and digital platforms for schools and universities. We focus on creating engaging, accessible, and easy-to-manage online experiences for students, faculty, and parents.',
        logoUrl: '/SDML.svg',
        projectUrl: 'https://www.sdmlllc.com/',
        imageUrl: '', // Not used in card
        modalImageUrl: '/sdml-details.png' // Used in modal
    },
];

const skillCategories = [
    {
        title: "Frontend",
        skills: ["React", "Next.js", "TypeScript", "TailwindCSS"]
    },
    {
        title: "Backend",
        skills: ["Node.js", "REST APIs", "GraphQL", "Authentication"]
    },
    {
        title: "Databases",
        skills: ["PostgreSQL", "MongoDB", "Firebase", "Prisma"]
    },
    {
        title: "DevOps",
        skills: ["Docker", "AWS", "CI/CD", "Vercel"]
    }
];

// --- Components ---
const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const ProjectCard = ({ project, onDetailsClick }: { project: Project, onDetailsClick: () => void }) => (
    <motion.div
        variants={cardVariants}
        className="group relative overflow-hidden rounded-2xl h-80 card-hover-lift"
    >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 z-0"></div>
        
        {/* Animated gradient border on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
        
        {/* Border */}
        <div className="absolute inset-0 border border-white/10 group-hover:border-cyan-400/50 transition-colors duration-300 rounded-2xl z-0"></div>
        
        <div className="relative z-10 p-8 h-full flex flex-col">
            <div className="w-16 h-16 p-2 bg-slate-800/80 backdrop-blur-sm rounded-xl border border-cyan-400/30 mb-6 group-hover:border-cyan-400/60 transition-colors">
                <Image src={project.logoUrl} alt={`${project.title} logo`} width={56} height={56} className="w-full h-full object-contain" />
            </div>
            <h3 className="text-2xl font-bold text-text mb-3 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
            <p className="text-base text-text-muted mb-8 flex-grow leading-relaxed">{project.description}</p>
            <div className="flex gap-3">
                <button
                    onClick={onDetailsClick}
                    className="flex-1 bg-slate-700/50 text-text py-3 px-4 rounded-lg text-sm font-semibold hover:bg-cyan-400/20 hover:text-cyan-400 transition-all duration-300 border border-cyan-400/30 hover:border-cyan-400/60"
                >
                    View Details
                </button>
                <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 px-4 rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                >
                    Visit Site
                </a>
            </div>
        </div>
    </motion.div>
);

const SkillCard = ({ name }: { name: string }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set(event.clientX - rect.left - rect.width / 2);
        y.set(event.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeave = () => { x.set(0); y.set(0); };

    return (
        <motion.div
            ref={ref}
            className="bg-gradient-to-br from-slate-800 to-slate-900 p-5 rounded-xl border border-cyan-400/20 text-center text-text-muted font-medium cursor-pointer group hover:border-cyan-400/60 transition-all duration-300 overflow-hidden relative"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ 
                boxShadow: '0 0 20px rgba(0, 200, 255, 0.3)',
                y: -4
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div style={{ transform: "translateZ(20px)" }} className="relative z-10 text-sm font-semibold text-cyan-100 group-hover:text-cyan-300 transition-colors">{name}</div>
        </motion.div>
    );
};

const SkillsAndProjects = ({ onProjectClick }: { onProjectClick: (project: Project) => void }) => {
    return (
        <section id="portfolio" className="py-32 sm:py-40 bg-gradient-to-b from-background via-blue-500/5 to-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="text-center mb-20">
                    <motion.h2 variants={cardVariants} className="text-4xl sm:text-5xl font-extrabold text-text">My Work & Expertise</motion.h2>
                    <motion.div variants={cardVariants} transition={{delay: 0.1}} className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-6 rounded-full"></motion.div>
                </motion.div>
                <div className="mb-32">
                    <h3 className="text-3xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-text to-cyan-300">Core Technologies</h3>
                    <p className="text-center text-text-muted mb-14">Expertise across modern web technologies and best practices</p>
                    <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} transition={{ staggerChildren: 0.1 }}>
                        {skillCategories.map(category => (
                            <motion.div key={category.title} variants={cardVariants}>
                                <h4 className="text-lg font-bold text-cyan-400 mb-6 text-center border-b-2 border-cyan-400/30 pb-3 hover:border-cyan-400/60 transition-colors">{category.title}</h4>
                                <div className="space-y-3">
                                    {category.skills.map(skill => (<SkillCard key={skill} name={skill} />))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
                <div>
                    <h3 className="text-3xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-text to-cyan-300">Featured Projects</h3>
                    <p className="text-center text-text-muted mb-14">A selection of projects I&apos;ve worked on</p>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} transition={{ staggerChildren: 0.15 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {projectsData.map((project) => (
                            <ProjectCard key={project.title} project={project} onDetailsClick={() => onProjectClick(project)} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SkillsAndProjects;
