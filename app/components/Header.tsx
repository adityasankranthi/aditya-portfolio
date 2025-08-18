'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleLinkClick = (e: MouseEvent) => {
            const target = e.target as HTMLAnchorElement;
            if (target.matches('a[href^="#"]')) {
                e.preventDefault();
                const targetElement = document.querySelector(target.getAttribute('href') as string);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
                setIsOpen(false); // Close menu on link click
            }
        };

        document.addEventListener('click', handleLinkClick);
        return () => document.removeEventListener('click', handleLinkClick);
    }, []);

    useEffect(() => {
        // Prevent body scroll when mobile menu is open
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    }, [isOpen]);

    const menuVariants = {
        closed: { opacity: 0, y: "-100%" },
        open: { opacity: 1, y: "0%" }
    };

    return (
        <>
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
                        {/* Desktop Navigation */}
                        <nav className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <a href="#about" className="text-text-muted hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">About</a>
                                <a href="#portfolio" className="text-text-muted hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">Portfolio</a>
                                <a href="#contact" className="text-text-muted hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</a>
                            </div>
                        </nav>
                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button onClick={() => setIsOpen(!isOpen)} className="text-text-muted hover:text-accent focus:outline-none">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {isOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </motion.header>
            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed inset-0 bg-primary z-40 md:hidden flex flex-col items-center justify-center space-y-8"
                    >
                        <a href="#about" className="text-2xl font-bold text-text-muted hover:text-accent transition-colors">About</a>
                        <a href="#portfolio" className="text-2xl font-bold text-text-muted hover:text-accent transition-colors">Portfolio</a>
                        <a href="#contact" className="text-2xl font-bold text-text-muted hover:text-accent transition-colors">Contact</a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
