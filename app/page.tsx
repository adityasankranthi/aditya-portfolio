'use client';

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import SkillsAndProjects from './components/SkillsAndProjects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
    const [selectedProject, setSelectedProject] = useState<any>(null); // Replace 'any' with a Project type if you define one
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.cursor = 'default';
            window.scrollTo(0, 0);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleProjectClick = (project: any) => { // Replace 'any'
        setSelectedProject(project);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
        document.body.style.overflow = 'auto';
    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-background flex items-center justify-center z-[100]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold text-accent"
                >
                    AS
                </motion.div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <main className="bg-background">
                <Hero />
                <About />
                <SkillsAndProjects onProjectClick={handleProjectClick} />
                <Contact />
            </main>
            <Footer />
            <AnimatePresence>
                {selectedProject && (
                    <ProjectModal project={selectedProject} onClose={handleCloseModal} />
                )}
            </AnimatePresence>
        </>
    );
}
