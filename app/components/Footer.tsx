'use client';
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => (
    <footer className="bg-gradient-to-t from-slate-950 to-slate-900/50 backdrop-blur-sm border-t border-cyan-400/10 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center justify-between"
            >
                <div className="text-center md:text-left mb-6 md:mb-0">
                    <p className="text-text-muted text-sm">
                        <span className="font-semibold text-cyan-400">Aditya Sankranthi</span> © {new Date().getFullYear()}. All Rights Reserved.
                    </p>
                    <p className="text-text-muted/60 text-xs mt-2">Crafted with React, Next.js, and TypeScript</p>
                </div>
                <div className="flex items-center space-x-6">
                    <div className="h-8 w-0.5 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent"></div>
                    <p className="text-text-muted text-xs">Made with ❤️ and code</p>
                </div>
            </motion.div>
        </div>
    </footer>
);

export default Footer;
