'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalOutput {
    id: string;
    command: string;
    output: React.ReactNode;
    timestamp: Date;
}

const TerminalHero = () => {
    const [input, setInput] = useState('');
    const [outputs, setOutputs] = useState<TerminalOutput[]>([
        {
            id: '0',
            command: '> const aditya = new FullStackDeveloper()',
            output: '✓ Instance created successfully',
            timestamp: new Date(),
        },
    ]);
    const [showCursor, setShowCursor] = useState(true);

    // Blink cursor effect
    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;
        e.preventDefault();

        const command = input.trim().toLowerCase();
        const newOutput = processCommand(command);

        setOutputs(prev => [...prev, ...newOutput]);
        setInput('');

        // Auto scroll to bottom
        setTimeout(() => {
            const terminal = document.getElementById('terminal');
            if (terminal) {
                terminal.scrollTop = terminal.scrollHeight;
            }
        }, 100);
    };

    const processCommand = (command: string): TerminalOutput[] => {
        const commandId = Date.now().toString();

        switch (command) {
            case '/skills':
                return [
                    {
                        id: commandId,
                        command: `> ${command}`,
                        output: (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                                {['React', 'Node.js', 'Spring Boot', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Kafka'].map(skill => (
                                    <div key={skill} className="bg-cyan-400/10 border border-cyan-400/30 px-2 py-1 rounded text-cyan-300">
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        ),
                        timestamp: new Date(),
                    },
                ];
            case '/experience':
                return [
                    {
                        id: commandId,
                        command: `> ${command}`,
                        output: (
                            <div className="space-y-2 text-sm">
                                <div className="text-green-400">📍 Java Full Stack Developer @ Saayam for All (Jul 2025 - Present)</div>
                                <div className="text-blue-400">📍 IT Lead Consultant @ UWM (Jun 2024 - Jul 2025)</div>
                                <div className="text-yellow-400">📍 Full Stack Developer Intern @ Swecha (Aug 2022 - Jul 2023)</div>
                            </div>
                        ),
                        timestamp: new Date(),
                    },
                ];
            case '/contact':
                return [
                    {
                        id: commandId,
                        command: `> ${command}`,
                        output: (
                            <div className="space-y-1 text-sm">
                                <div className="text-purple-400">📧 srgaditya@gmail.com</div>
                                <div className="text-purple-400">🔗 linkedin.com/in/aditya-sankranthi-82b4131b6</div>
                                <div className="text-purple-400">🐙 github.com/adityasankranthi</div>
                                <div className="text-purple-400">📍 Milwaukee, Wisconsin</div>
                            </div>
                        ),
                        timestamp: new Date(),
                    },
                ];
            case '/easter-egg':
            case '/easteregg':
                return [
                    {
                        id: commandId,
                        command: `> ${command}`,
                        output: (
                            <div className="text-center space-y-2">
                                <div className="text-pink-400 font-bold animate-pulse">🚀 You found the secret! 🚀</div>
                                <div className="text-cyan-300 text-sm">Why did the developer go broke?</div>
                                <div className="text-green-400 text-sm">Because he used up all his cache! 💾</div>
                                <div className="text-yellow-400 text-xs mt-4">Pro tip: Try /help for all commands</div>
                            </div>
                        ),
                        timestamp: new Date(),
                    },
                ];
            case '/help':
                return [
                    {
                        id: commandId,
                        command: `> ${command}`,
                        output: (
                            <div className="space-y-1 text-xs">
                                <div className="text-cyan-400">/skills - View tech stack</div>
                                <div className="text-cyan-400">/experience - Show work history</div>
                                <div className="text-cyan-400">/contact - Get contact info</div>
                                <div className="text-cyan-400">/projects - View projects</div>
                                <div className="text-cyan-400">/easter-egg - Find a surprise 🎉</div>
                                <div className="text-cyan-400">clear - Clear terminal</div>
                            </div>
                        ),
                        timestamp: new Date(),
                    },
                ];
            case '/projects':
                return [
                    {
                        id: commandId,
                        command: `> ${command}`,
                        output: (
                            <div className="space-y-2 text-sm">
                                <div className="text-indigo-400">🎯 Job Application Autofill & Tracker (In Progress)</div>
                                <div className="text-indigo-400">📰 News Aggregation Platform (University Project)</div>
                                <div className="text-indigo-400">💬 AI Support Chatbot (Internship Project)</div>
                            </div>
                        ),
                        timestamp: new Date(),
                    },
                ];
            case 'clear':
                setOutputs([
                    {
                        id: Date.now().toString(),
                        command: '',
                        output: '',
                        timestamp: new Date(),
                    },
                ]);
                return [];
            default:
                return [
                    {
                        id: commandId,
                        command: `> ${command}`,
                        output: <div className="text-red-400">Command not found: {command}. Type /help for available commands.</div>,
                        timestamp: new Date(),
                    },
                ];
        }
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center py-20 px-4">
            {/* Background grid effect */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

            <div className="relative z-10 w-full max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8 text-center"
                >
                    <h1 className="text-4xl sm:text-6xl font-bold text-text mb-2">
                        Aditya Sankranthi
                    </h1>
                    <p className="text-lg text-cyan-400">Full Stack Engineer | Problem Solver | Code Artist</p>
                </motion.div>

                {/* Terminal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-black/80 backdrop-blur border border-cyan-400/30 rounded-lg overflow-hidden shadow-2xl"
                >
                    {/* Terminal Header */}
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-3 flex items-center justify-between border-b border-cyan-400/20">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-xs text-cyan-400 font-mono">aditya-dev@portfolio:~</span>
                    </div>

                    {/* Terminal Content */}
                    <div
                        id="terminal"
                        className="h-80 overflow-y-auto p-6 font-mono text-sm space-y-3 bg-black"
                    >
                        <AnimatePresence>
                            {outputs.map((output, idx) => (
                                <motion.div
                                    key={output.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {output.command && (
                                        <div className="text-cyan-400">{output.command}</div>
                                    )}
                                    {output.output && (
                                        <div className="text-text-muted ml-4">
                                            {output.output}
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Terminal Input */}
                    <div className="bg-black/50 border-t border-cyan-400/20 px-6 py-4">
                        <div className="flex items-center font-mono text-sm">
                            <span className="text-cyan-400 mr-2">{'>'}</span>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleCommand}
                                placeholder="Type /help for commands..."
                                className="flex-1 bg-transparent text-text outline-none placeholder-text-muted/50"
                                autoFocus
                            />
                            {showCursor && <span className="ml-2 animate-pulse text-cyan-400">▌</span>}
                        </div>
                    </div>
                </motion.div>

                {/* Helper Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-center mt-6 text-xs text-text-muted"
                >
                    <p>💡 Try typing: <span className="text-cyan-400">/skills</span>, <span className="text-cyan-400">/experience</span>, <span className="text-cyan-400">/contact</span>, or <span className="text-cyan-400">/help</span></p>
                </motion.div>
            </div>
        </section>
    );
};

export default TerminalHero;
