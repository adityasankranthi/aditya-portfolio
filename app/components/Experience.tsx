'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface ExperienceItem {
    title: string;
    company: string;
    period: string;
    description: string;
    highlights: string[];
    technologies: string[];
}

const experienceData: ExperienceItem[] = [
    {
        title: 'Full Stack Engineer',
        company: 'Schools Daily MediaLabs',
        period: '2023 - Present',
        description: 'Architecting and developing custom web solutions for educational institutions, focusing on user-centric design and scalable backend systems.',
        highlights: [
            'Built 5+ production-grade web platforms',
            'Improved performance by 60% with optimization',
            'Led technical strategy for 10+ client projects',
            'Mentored 2 junior developers'
        ],
        technologies: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'AWS']
    },
    {
        title: 'Software Engineer',
        company: 'EasyApply.ai',
        period: '2023 - Present',
        description: 'Developing AI-powered automation platform to streamline job application processes with intelligent resume matching and auto-filling capabilities.',
        highlights: [
            'Architected AI integration pipeline',
            'Reduced application time by 80%',
            '500+ active users',
            'Full-stack implementation'
        ],
        technologies: ['React', 'Python', 'FastAPI', 'Machine Learning', 'PostgreSQL']
    }
];

const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
};

const ExperienceCard: React.FC<{ item: ExperienceItem; index: number }> = ({ item, index }) => (
    <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: index * 0.1 }}
        className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300"
    >
        {/* Animated gradient background on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

        <div className="relative z-10">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-2xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors">
                        {item.title}
                    </h3>
                    <p className="text-lg text-text-muted mt-1">{item.company}</p>
                </div>
                <span className="text-sm font-semibold text-blue-400/80 bg-blue-400/10 px-4 py-2 rounded-full whitespace-nowrap ml-4">
                    {item.period}
                </span>
            </div>

            {/* Description */}
            <p className="text-text-muted mb-6 leading-relaxed">{item.description}</p>

            {/* Highlights */}
            <div className="mb-6">
                <h4 className="text-sm font-semibold text-blue-300 mb-3">Key Achievements:</h4>
                <ul className="space-y-2">
                    {item.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start text-text-muted">
                            <span className="text-blue-400 mr-3 mt-1">✓</span>
                            <span>{highlight}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech) => (
                    <span
                        key={tech}
                        className="text-xs font-semibold text-blue-300 bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20 group-hover:border-blue-400/50 transition-colors"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    </motion.div>
);

const Experience = () => {
    return (
        <section id="experience" className="py-32 sm:py-40 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Section Header */}
                    <div className="text-center mb-20">
                        <h2 className="text-4xl sm:text-5xl font-extrabold text-text">Professional Experience</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-500 mx-auto mt-6 rounded-full"></div>
                    </div>

                    {/* Experience Items */}
                    <div className="max-w-4xl mx-auto space-y-8">
                        {experienceData.map((item, index) => (
                            <ExperienceCard key={index} item={item} index={index} />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Experience;
