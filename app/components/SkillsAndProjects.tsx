'use client';
import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

// --- Data ---
const projectsData = [
    {
        title: 'EasyApply.ai',
        description: 'AI-powered platform to automate job applications.',
        longDescription: 'EasyApply.ai is a comprehensive tool designed to streamline the job application process. It uses AI to autofill applications, tailor resumes, and track submissions, helping users apply to hundreds of jobs efficiently.',
        imageUrl: 'https://placehold.co/600x400/0D0C1D/E0E0E0?text=AI+Automation+Interface',
        modalImageUrl: '/easyapply-details.png',
        logoUrl: '/EasyApply.svg',
        projectUrl: '#' // Replace with actual URL
    },
    {
        title: 'Schools Daily MediaLabs',
        description: 'Custom web solutions for educational institutions.',
        longDescription: 'Schools Daily MediaLabs provides bespoke websites and digital platforms for schools and universities. We focus on creating engaging, accessible, and easy-to-manage online experiences for students, faculty, and parents.',
        imageUrl: 'https://placehold.co/600x400/0D0C1D/E0E0E0?text=Educational+Platform+UI',
        modalImageUrl: '/sdml-details.png',
        logoUrl: '/SDML.svg',
        projectUrl: 'https://www.sdmlllc.com/'
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

const ProjectCard = ({ project, onDetailsClick }: { project: any, onDetailsClick: () => void }) => (
    <motion.div
        variants={cardVariants}
        className="bg-primary/50 backdrop-blur-md rounded-2xl overflow-hidden group border border-white/10 flex flex-col relative"
    >
        <div className="absolute -inset-px bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-70 transition-opacity duration-300 rounded-2xl"></div>
        <div className="relative bg-primary rounded-2xl m-px flex flex-col flex-grow">
            <div className="relative">
                <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute top-4 left-4 w-12 h-12 p-1.5 bg-primary/80 backdrop-blur-sm rounded-lg border-2 border-white/20 overflow-hidden">
                    <img src={project.logoUrl} alt={`${project.title} logo`} className="w-full h-full object-contain" />
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-text">{project.title}</h3>
                <p className="text-sm text-text-muted mt-1 flex-grow">{project.description}</p>
                <div className="mt-4 flex space-x-2">
                    <button
                        onClick={onDetailsClick}
                        className="flex-1 bg-primary text-text py-2 px-4 rounded-full text-sm font-semibold hover:bg-accent hover:text-white transition-colors border border-white/10"
                    >
                        View Details
                    </button>
                    <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center bg-accent text-white py-2 px-4 rounded-full text-sm font-semibold hover:bg-accent-hover transition-colors"
                    >
                        Visit Site
                    </a>
                </div>
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

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className="bg-primary p-4 rounded-lg border border-white/10 text-center text-text-muted font-medium cursor-pointer"
            style={{ 
                rotateX, 
                rotateY, 
                transformStyle: "preserve-3d",
                perspective: "1000px" 
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{
                boxShadow: '0 0 20px rgba(0, 246, 255, 0.3)',
                borderColor: 'rgba(0, 246, 255, 0.5)',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <div style={{ transform: "translateZ(20px)" }}>
                {name}
            </div>
        </motion.div>
    );
};

const SkillsAndProjects = ({ onProjectClick }: { onProjectClick: (project: any) => void }) => {
    return (
        <section id="portfolio" className="py-24 sm:py-32 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* --- Title --- */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="text-center mb-16"
                >
                    <motion.h2 variants={cardVariants} className="text-3xl sm:text-4xl font-extrabold text-text">My Work & Expertise</motion.h2>
                    <motion.div variants={cardVariants} transition={{delay: 0.1}} className="w-20 h-1 bg-accent mx-auto mt-4 rounded"></motion.div>
                </motion.div>

                {/* --- Skills Section --- */}
                <div className="mb-24">
                    <h3 className="text-2xl font-bold text-text text-center mb-12">Core Technologies</h3>
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ staggerChildren: 0.1 }}
                    >
                        {skillCategories.map(category => (
                            <motion.div key={category.title} variants={cardVariants}>
                                <h4 className="text-lg font-semibold text-accent mb-4 text-center border-b-2 border-accent/30 pb-2">{category.title}</h4>
                                <div className="space-y-4">
                                    {category.skills.map(skill => (
                                        <SkillCard key={skill} name={skill} />
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* --- Projects Section --- */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ staggerChildren: 0.15 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {projectsData.map((project) => (
                        <ProjectCard key={project.title} project={project} onDetailsClick={() => onProjectClick(project)} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default SkillsAndProjects;
