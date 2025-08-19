'use client';
import React from 'react';
import HeroCanvas from './HeroCanvas';
import { motion } from 'framer-motion';

const Hero = () => (
    <section id="home" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        <HeroCanvas />
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="z-10 p-4"
        >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-text">
                <span className="block">Aditya Sankranthi</span>
                <span className="block text-accent mt-2">Software Engineer</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-text-muted">
                Architecting the digital frontier with code and creativity. From India to Itay to USA, building the future of the web.
            </p>
            <div className="mt-10">
                <a href="#portfolio" className="inline-block bg-accent text-white font-bold py-3 px-8 rounded-full hover:bg-accent-hover transition duration-300 transform hover:scale-105 shadow-neon-accent">
                    Explore My Work
                </a>
            </div>
        </motion.div>
    </section>
);

export default Hero;