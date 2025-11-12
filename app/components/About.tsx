'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const About = () => (
    <section id="about" className="py-32 sm:py-40 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8 }}
            >
                <div className="text-center mb-20">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-text">About Me</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-6 rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-center">
                    <motion.div 
                        className="md:col-span-1 flex justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-2xl opacity-20 scale-110"></div>
                            <motion.div 
                                className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-cyan-400/50"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <Image 
                                    src="/aditya-photo.png" 
                                    alt="Aditya Sankranthi" 
                                    width={256} 
                                    height={256}
                                    className="w-full h-full object-cover" 
                                    priority
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                    <div className="md:col-span-2 space-y-6">
                        <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-lg text-text-muted leading-relaxed"
                        >
                            Hello! I&apos;m Aditya, a software engineer with a global perspective, driven by a passion for building elegant and impactful digital solutions. My academic journey began at the <span className="text-cyan-400 font-semibold">University of Rome &quot;Tor Vergata&quot;</span> and culminated in a master&apos;s from the <span className="text-cyan-400 font-semibold">University of Wisconsin-Milwaukee</span>—the same alma mater as Microsoft&apos;s CEO, Satya Nadella.
                        </motion.p>
                        <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg text-text-muted leading-relaxed"
                        >
                            This diverse background has equipped me with a unique approach to problem-solving. I specialize in full-stack development, transforming complex challenges into seamless, user-centric applications. I thrive on clean code, scalable architecture, and continuous learning.
                        </motion.p>
                    </div>
                </div>
            </motion.div>
        </div>
    </section>
);

export default About;