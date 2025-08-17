'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image'; // Import Next.js Image component

const About = () => (
    <section id="about" className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-text">About Me</h2>
                    <div className="w-20 h-1 bg-accent mx-auto mt-4 rounded"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
                    <div className="md:col-span-1 flex justify-center">
                        <motion.div 
                            className="w-64 h-64 rounded-full overflow-hidden border-4 border-accent shadow-neon-accent"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <Image 
                                src="/aditya-photo.png" 
                                alt="Aditya Sankranthi" 
                                width={256} 
                                height={256}
                                className="w-full h-full object-cover" 
                            />
                        </motion.div>
                    </div>
                    <div className="md:col-span-2 text-lg text-text-muted space-y-6">
                        <p>Hello! I&apos;m Aditya, a software engineer with a global perspective, driven by a passion for building elegant and impactful digital solutions. My academic journey began at the <strong className="text-accent">University of Rome &quot;Tor Vergata&quot;</strong> and culminated in a master&apos;s from the <strong className="text-accent">University of Wisconsin-Milwaukee</strong>—the same alma mater as Microsoft&apos;s CEO, Satya Nadella.</p>
                        <p>This diverse background has equipped me with a unique approach to problem-solving. I specialize in full-stack development, transforming complex challenges into seamless, user-centric applications. I thrive on clean code, scalable architecture, and continuous learning.</p>
                    </div>
                </div>
            </motion.div>
        </div>
    </section>
);

export default About;
