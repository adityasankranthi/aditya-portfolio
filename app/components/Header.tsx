'use client';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
    useEffect(() => {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(anchor => {
            anchor.addEventListener('click', function (e: Event) {
                e.preventDefault();
                const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
                if (href) {
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }, []);

    return (
        <motion.header 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-50 glass-effect"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <a href="#home" className="text-2xl font-bold text-accent hover:text-accent-hover transition-colors">AS</a>
                    </div>
                    <nav className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <a href="#about" className="text-text-muted hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">About</a>
                            <a href="#portfolio" className="text-text-muted hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">Portfolio</a>
                            <a href="#contact" className="text-text-muted hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</a>
                        </div>
                    </nav>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;