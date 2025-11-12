'use client';
import React, { useState, useEffect } from 'react';
import HeroCanvas from './HeroCanvas';
import { motion } from 'framer-motion';

const Hero = () => {
    const [displayText, setDisplayText] = useState('');
    const fullText = 'Software Engineer';
    const typingSpeed = 100;

    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index < fullText.length) {
                setDisplayText(fullText.substring(0, index + 1));
                index++;
            } else {
                clearInterval(timer);
            }
        }, typingSpeed);

        return () => clearInterval(timer);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8 },
        },
    };

    return (
        <section id="home" className="relative h-screen flex items-center justify-center text-center overflow-hidden">
            <HeroCanvas />
            <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="z-10 p-4 max-w-4xl mx-auto"
            >
                <motion.div variants={itemVariants}>
                    <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight text-text leading-tight">
                        <span className="block">Aditya Sankranthi</span>
                    </h1>
                </motion.div>
                
                <motion.div variants={itemVariants} className="mt-4 min-h-20">
                    <span className="inline-block text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {displayText}
                        <span className="animate-pulse">|</span>
                    </span>
                </motion.div>

                <motion.p 
                    variants={itemVariants}
                    className="mt-8 max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-text-muted leading-relaxed"
                >
                    Architecting the digital frontier with code and creativity. From India to Italy to USA, building the future of the web.
                </motion.p>

                <motion.div 
                    variants={itemVariants}
                    className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <motion.a 
                        href="#portfolio"
                        whileHover={{ scale: 1.05, rotateZ: -1 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-4 px-10 rounded-full hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 text-lg cursor-pointer"
                    >
                        ✨ Explore My Work
                    </motion.a>
                    <motion.a 
                        href="#contact"
                        whileHover={{ scale: 1.05, rotateZ: 1 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block bg-transparent border-2 border-cyan-400 text-cyan-400 font-bold py-4 px-10 rounded-full hover:bg-cyan-400/10 transition-all duration-300 text-lg cursor-pointer"
                    >
                        💬 Get In Touch
                    </motion.a>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;