'use client';

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import SkillsAndProjects from './components/SkillsAndProjects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import { InteractiveCursor, FloatingParticles, EmojiReaction, useEmojiReactions } from './components/InteractiveEffects';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from './types/index'; // Import the shared Project type

export default function App() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { reactions, triggerReaction } = useEmojiReactions();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.cursor = 'default';
            window.scrollTo(0, 0);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    // Add emoji reactions on random events
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (Math.random() > 0.7) {
                triggerReaction(e.clientX, e.clientY);
            }
        };

        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, [triggerReaction]);

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        document.body.style.overflow = 'hidden';
        triggerReaction(window.innerWidth / 2, window.innerHeight / 2);
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
        document.body.style.overflow = 'auto';
    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-background flex items-center justify-center z-[100]">
                <InteractiveCursor />
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold text-accent glitch"
                >
                    AS
                </motion.div>
            </div>
        );
    }

    return (
        <>
            <InteractiveCursor />
            <FloatingParticles />
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
            <AnimatePresence>
                {reactions.map((reaction) => (
                    <EmojiReaction key={reaction.id} x={reaction.x} y={reaction.y} emoji={reaction.emoji} />
                ))}
            </AnimatePresence>
        </>
    );
}