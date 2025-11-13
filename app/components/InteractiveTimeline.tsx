'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimelineStation {
    id: string;
    role: string;
    company: string;
    period: string;
    icon: string;
    metrics: Array<{
        label: string;
        value: string;
        unit?: string;
    }>;
    technologies: string[];
    description: string;
    color: string;
}

const InteractiveTimeline = () => {
    const stations: TimelineStation[] = [
        {
            id: '1',
            role: 'Java Full Stack Developer',
            company: 'Saayam for All',
            period: 'Jul 2025 - Present',
            icon: '🚀',
            metrics: [
                { label: 'Daily Active Users', value: '5K+', unit: 'users' },
                { label: 'Message Processing', value: '15K+', unit: 'msgs/sec' },
                { label: 'System Uptime', value: '99.9%', unit: 'availability' },
            ],
            technologies: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'AWS', 'Docker'],
            description: 'Building scalable microservices architecture. Leading full-stack development with focus on performance optimization.',
            color: 'from-blue-500 to-emerald-600',
        },
        {
            id: '2',
            role: 'IT Lead Consultant',
            company: 'University of Wisconsin-Milwaukee',
            period: 'Jun 2024 - Jul 2025',
            icon: '🎓',
            metrics: [
                { label: 'SLA Compliance', value: '98%', unit: 'uptime' },
                { label: 'Response Time Reduction', value: '40%', unit: 'improvement' },
                { label: 'Incident Resolution', value: '20%', unit: 'faster' },
            ],
            technologies: ['Node.js', 'MongoDB', 'React', 'AWS', 'Git'],
            description: 'Managed IT infrastructure and led digital transformation initiatives. Improved system reliability and performance.',
            color: 'from-blue-500 to-blue-600',
        },
        {
            id: '3',
            role: 'Full Stack Developer Intern',
            company: 'Swecha Telangana',
            period: 'Aug 2022 - Jul 2023',
            icon: '💼',
            metrics: [
                { label: 'Frontend Efficiency', value: '25%', unit: 'time reduction' },
                { label: 'Code Review Participation', value: '100%', unit: 'active' },
                { label: 'Bug Fixes', value: '50+', unit: 'resolved' },
            ],
            technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind', 'Docker'],
            description: 'Developed responsive web applications. Implemented modern UI/UX patterns and optimized component architecture.',
            color: 'from-yellow-500 to-orange-600',
        },
        {
            id: '4',
            role: 'Software Engineering Intern',
            company: 'University of Rome',
            period: 'Jan 2022 - May 2022',
            icon: '🌍',
            metrics: [
                { label: 'News Sources Aggregated', value: '50+', unit: 'feeds' },
                { label: 'Articles Per Day', value: '10K+', unit: 'indexed' },
                { label: 'Search Accuracy', value: '96%', unit: 'precision' },
            ],
            technologies: ['Python', 'Flask', 'PostgreSQL', 'HTML/CSS', 'REST APIs'],
            description: 'Built news aggregation platform with advanced search and filtering. Worked with international team on scalability.',
            color: 'from-purple-500 to-pink-600',
        },
    ];

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [selectedStation, setSelectedStation] = useState<TimelineStation>(stations[0]);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScroll();
        const container = scrollContainerRef.current;
        container?.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);
        return () => {
            container?.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        };
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 320;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section id="timeline" className="py-20 px-4 bg-background relative">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto mb-16"
            >
                <h2 className="text-4xl sm:text-5xl font-bold text-text mb-4">Career Journey</h2>
                <p className="text-lg text-text-muted">My professional growth and achievements</p>
            </motion.div>

            {/* Main Timeline Container */}
            <div className="max-w-6xl mx-auto">
                {/* Horizontal Scroll */}
                <div className="relative group">
                    {/* Left Scroll Button */}
                    <AnimatePresence>
                        {canScrollLeft && (
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => scroll('left')}
                                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-r from-background to-transparent p-3 hover:scale-110 transition-transform"
                            >
                                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </motion.button>
                        )}
                    </AnimatePresence>

                    {/* Right Scroll Button */}
                    <AnimatePresence>
                        {canScrollRight && (
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => scroll('right')}
                                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gradient-to-l from-background to-transparent p-3 hover:scale-110 transition-transform"
                            >
                                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </motion.button>
                        )}
                    </AnimatePresence>

                    {/* Scrollable Container */}
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto scroll-smooth pb-4 px-4 -mx-4"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {stations.map((station, idx) => (
                            <motion.div
                                key={station.id}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                onClick={() => setSelectedStation(station)}
                                className="flex-shrink-0 w-80 cursor-pointer group"
                            >
                                {/* Timeline Card */}
                                <motion.div
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    className={`bg-gradient-to-br ${station.color} p-0.5 rounded-lg h-full transition-all ${
                                        selectedStation.id === station.id
                                            ? 'ring-2 ring-blue-400 shadow-2xl shadow-blue-400/50'
                                            : 'hover:shadow-xl hover:shadow-blue-400/30'
                                    }`}
                                >
                                    <div className="bg-black/90 rounded-lg p-6 h-full flex flex-col">
                                        {/* Header with Icon */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="text-4xl">{station.icon}</div>
                                            <div className="text-xs bg-blue-400/20 text-blue-300 px-2 py-1 rounded">
                                                {station.period}
                                            </div>
                                        </div>

                                        {/* Role & Company */}
                                        <h3 className="text-lg font-bold text-text mb-1">{station.role}</h3>
                                        <p className="text-sm text-blue-400 mb-4 font-semibold">{station.company}</p>

                                        {/* Metrics Preview */}
                                        <div className="grid grid-cols-2 gap-2 mb-4">
                                            {station.metrics.slice(0, 2).map((metric, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    whileHover={{ scale: 1.05 }}
                                                    className="bg-blue-400/10 border border-blue-400/30 p-2 rounded text-xs"
                                                >
                                                    <div className="text-blue-300 font-bold text-sm">{metric.value}</div>
                                                    <div className="text-text-muted text-xs">{metric.label}</div>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Tech Stack */}
                                        <div className="flex flex-wrap gap-2">
                                            {station.technologies.slice(0, 3).map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="text-xs bg-text-muted/10 text-text-muted px-2 py-1 rounded"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {station.technologies.length > 3 && (
                                                <span className="text-xs bg-text-muted/10 text-text-muted px-2 py-1 rounded">
                                                    +{station.technologies.length - 3}
                                                </span>
                                            )}
                                        </div>

                                        {/* Hover Indicator */}
                                        <motion.div
                                            className="mt-4 text-center text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                            animate={{ opacity: selectedStation.id === station.id ? 1 : 0 }}
                                        >
                                            Click for details
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Detail Section */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedStation.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="mt-12 bg-gradient-to-r from-slate-900/50 to-slate-800/50 border border-blue-400/20 rounded-lg p-8"
                    >
                        {/* Detail Header */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="text-5xl">{selectedStation.icon}</div>
                            <div>
                                <h3 className="text-2xl font-bold text-text">{selectedStation.role}</h3>
                                <p className="text-blue-400 font-semibold">{selectedStation.company}</p>
                                <p className="text-sm text-text-muted">{selectedStation.period}</p>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-text-muted mb-8 leading-relaxed">{selectedStation.description}</p>

                        {/* Metrics Grid */}
                        <div className="mb-8">
                            <h4 className="text-lg font-bold text-text mb-4">Key Achievements</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {selectedStation.metrics.map((metric, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="bg-black/50 border border-blue-400/30 p-4 rounded-lg"
                                    >
                                        <motion.div
                                            className="text-3xl font-bold text-blue-400 mb-2"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.3 + idx * 0.1 }}
                                        >
                                            {metric.value}
                                        </motion.div>
                                        <p className="text-sm text-text-muted">{metric.label}</p>
                                        {metric.unit && <p className="text-xs text-text-muted/50 mt-1">{metric.unit}</p>}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Technologies */}
                        <div>
                            <h4 className="text-lg font-bold text-text mb-4">Tech Stack</h4>
                            <div className="flex flex-wrap gap-2">
                                {selectedStation.technologies.map((tech) => (
                                    <motion.span
                                        key={tech}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-gradient-to-r from-blue-400/20 to-blue-400/20 border border-blue-400/50 text-blue-300 px-3 py-1.5 rounded-full text-sm font-medium"
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Timeline Indicator Dots */}
                <div className="flex justify-center gap-2 mt-12">
                    {stations.map((station) => (
                        <motion.button
                            key={station.id}
                            onClick={() => setSelectedStation(station)}
                            className={`h-2 rounded-full transition-all ${
                                selectedStation.id === station.id
                                    ? 'bg-blue-400 w-8'
                                    : 'bg-text-muted/30 w-2 hover:bg-text-muted/50'
                            }`}
                            whileHover={{ scale: 1.2 }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InteractiveTimeline;
