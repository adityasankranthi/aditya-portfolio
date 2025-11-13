'use client';

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TerminalHero from './components/TerminalHero';
import About from './components/About';
import Experience from './components/Experience';
import InteractiveTimeline from './components/InteractiveTimeline';
import EnhancedProjects from './components/EnhancedProjects';
import SkillConstellation from './components/SkillConstellation';
import HowIWork from './components/HowIWork';
import EnhancedContact from './components/EnhancedContact';
import StructuredData from './components/StructuredData';
import Footer from './components/Footer';
import { InteractiveCursor, FloatingParticles, EmojiReaction, useEmojiReactions } from './components/InteractiveEffects';
import InteractiveEffectsManager from './components/InteractiveEffects';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
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
            <StructuredData />
            <InteractiveCursor />
            <FloatingParticles />
            <Header />
            <main className="bg-background">
                <TerminalHero />
                <About />
                <Experience />
                <InteractiveTimeline />
                <EnhancedProjects />
                <SkillConstellation />
                <HowIWork />
                <EnhancedContact />
            </main>
            <Footer />
            <AnimatePresence>
                {reactions.map((reaction: { id: number; x: number; y: number; emoji: string }) => (
                    <EmojiReaction key={reaction.id} x={reaction.x} y={reaction.y} emoji={reaction.emoji} />
                ))}
            </AnimatePresence>
            <InteractiveEffectsManager />
        </>
    );
}