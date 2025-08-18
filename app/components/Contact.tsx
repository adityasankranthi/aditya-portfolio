'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const GitHubIcon = () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
);

const LinkedInIcon = () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
);

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const Contact = () => {
    const [status, setStatus] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus('sending');
        const formData = new FormData(event.currentTarget);

        try {
            const response = await fetch('https://formspree.io/f/xgvzbnva', { // <-- IMPORTANT: Replace with your Formspree ID
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setStatus('success');
                (event.target as HTMLFormElement).reset();
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <section id="contact" className="py-24 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={cardVariants} className="text-center">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-text">Get In Touch</h2>
                    <div className="w-20 h-1 bg-accent mx-auto mt-4 rounded"></div>
                    <div className="max-w-xl mx-auto">
                        <p className="text-lg text-text-muted my-8">I&apos;m always open to discussing new projects, creative ideas, or opportunities. Feel free to reach out using the form below.</p>
                        
                        <form onSubmit={handleSubmit} className="space-y-4 text-left">
                            <input type="email" name="email" placeholder="Your Email" required className="w-full p-3 bg-primary border border-white/10 rounded-md text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent" />
                            <textarea name="message" placeholder="Your Message" required rows={4} className="w-full p-3 bg-primary border border-white/10 rounded-md text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"></textarea>
                            
                            {status === 'success' ? 
                                <p className="text-center text-secondary">Message sent successfully!</p> :
                                <button type="submit" disabled={status === 'sending'} className="w-full bg-accent text-white font-bold py-3 px-8 rounded-full hover:bg-accent-hover transition duration-300 transform hover:scale-105 shadow-neon-accent disabled:opacity-50 disabled:cursor-not-allowed">
                                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                                </button>
                            }
                            {status === 'error' && <p className="text-center text-red-500">Something went wrong. Please try again.</p>}
                        </form>

                        <div className="flex justify-center space-x-6 mt-12">
                            <motion.a href="https://github.com/adityasankranthi" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1, y: -2 }} className="text-text-muted hover:text-accent transition-colors">
                                <GitHubIcon />
                            </motion.a>
                            <motion.a href="https://linkedin.com/in/aditya-sankranthi-82b4131b6" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1, y: -2 }} className="text-text-muted hover:text-accent transition-colors">
                                <LinkedInIcon />
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;