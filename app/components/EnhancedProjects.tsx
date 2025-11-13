'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectDetails {
    id: string;
    title: string;
    category: 'featured' | 'experimental' | 'learning';
    description: string;
    shortDescription: string;
    image?: string;
    technologies: string[];
    metrics: Array<{ label: string; value: string }>;
    demoUrl?: string;
    githubUrl?: string;
    highlights: string[];
    architecture?: {
        layers: string[];
        description: string;
    };
    status: 'Live' | 'In Progress' | 'Completed';
    emoji: string;
}

const EnhancedProjects = () => {
    const [selectedCategory, setSelectedCategory] = useState<'featured' | 'experimental' | 'learning'>('featured');
    const [selectedProject, setSelectedProject] = useState<ProjectDetails | null>(null);
    const [showArchitecture, setShowArchitecture] = useState(false);

    const projects: ProjectDetails[] = [
        {
            id: '1',
            title: 'Job Application Autofill & Tracker',
            category: 'featured',
            shortDescription: 'Smart job application automation platform',
            description:
                'Intelligent platform that automates job application form filling and tracks application history. Integrates with LinkedIn, Glassdoor, and Indeed to streamline the job search process for developers.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Puppeteer', 'AWS', 'Material-UI'],
            metrics: [
                { label: 'Forms Automated', value: '1000+' },
                { label: 'Dev Adoption', value: '5K+' },
                { label: 'Time Saved', value: '40 hrs' },
                { label: 'Success Rate', value: '98%' },
            ],
            highlights: [
                'Auto-fill form fields from LinkedIn profile',
                'One-click application submission',
                'Application tracking with analytics dashboard',
                'Email notifications for new opportunities',
                'Browser extension available',
            ],
            architecture: {
                layers: [
                    'Frontend: React SPA with Redux state management',
                    'Backend: Node.js Express API with job posting scraping',
                    'Database: MongoDB for application records',
                    'Automation: Puppeteer for browser automation',
                    'Deployment: AWS EC2 with Docker containers',
                ],
                description: 'Microservices architecture with job scraper, form processor, and notification engine',
            },
            demoUrl: 'https://job-autofill-demo.vercel.app',
            githubUrl: 'https://github.com/adityasankranthi/job-application-autofill',
            status: 'In Progress',
            emoji: '💼',
        },
        {
            id: '2',
            title: 'E-Commerce Microservices Platform',
            category: 'featured',
            shortDescription: 'Scalable microservices-based e-commerce system',
            description:
                'Enterprise-grade e-commerce platform built with microservices architecture. Features distributed transaction handling, real-time inventory sync, and high-availability design.',
            technologies: ['Spring Boot', 'Kafka', 'PostgreSQL', 'Docker', 'Kubernetes', 'Redis'],
            metrics: [
                { label: 'Requests/sec', value: '15K+' },
                { label: 'Services', value: '8' },
                { label: 'Availability', value: '99.99%' },
                { label: 'Response Time', value: '< 100ms' },
            ],
            highlights: [
                'Product catalog microservice with Elasticsearch',
                'Order management with Kafka event streaming',
                'Payment processing with Stripe integration',
                'Real-time inventory management',
                'Distributed tracing with Jaeger',
                'Auto-scaling with Kubernetes',
            ],
            architecture: {
                layers: [
                    'API Gateway: Kong for request routing and rate limiting',
                    'Microservices: Product, Order, Payment, Inventory services',
                    'Message Queue: Kafka for async communication',
                    'Cache Layer: Redis for session and product data',
                    'Database: PostgreSQL with event sourcing',
                    'Orchestration: Kubernetes with auto-scaling',
                ],
                description: 'Event-driven architecture with CQRS pattern for scalability',
            },
            demoUrl: 'https://ecommerce-demo.vercel.app',
            githubUrl: 'https://github.com/adityasankranthi/ecommerce-microservices',
            status: 'Completed',
            emoji: '🛒',
        },
        {
            id: '3',
            title: 'News Aggregation Platform',
            category: 'learning',
            shortDescription: 'Intelligent news aggregation with AI summaries',
            description:
                'Comprehensive news aggregation platform that collects articles from 50+ RSS feeds, applies NLP for categorization, and provides personalized news digest.',
            technologies: ['Python', 'Flask', 'PostgreSQL', 'Celery', 'React', 'HTML/CSS'],
            metrics: [
                { label: 'News Sources', value: '50+' },
                { label: 'Articles/Day', value: '10K+' },
                { label: 'Users', value: '2K+' },
                { label: 'Search Accuracy', value: '96%' },
            ],
            highlights: [
                'Multi-source RSS feed aggregation',
                'NLP-based article categorization',
                'Duplicate detection with similarity scoring',
                'Personalized news recommendations',
                'Full-text search with Elasticsearch',
                'User preference learning algorithm',
            ],
            architecture: {
                layers: [
                    'Frontend: React SPA with responsive design',
                    'Backend: Flask REST API',
                    'Task Queue: Celery for scheduled feed fetching',
                    'NLP Processing: NLTK for text analysis',
                    'Search: Elasticsearch for indexing and retrieval',
                    'Database: PostgreSQL for persistent storage',
                ],
                description: 'Distributed architecture with background job processing',
            },
            demoUrl: 'https://news-agg-demo.vercel.app',
            githubUrl: 'https://github.com/adityasankranthi/news-aggregator',
            status: 'Completed',
            emoji: '📰',
        },
        {
            id: '4',
            title: 'AI-Powered Support Chatbot',
            category: 'experimental',
            shortDescription: 'Intelligent customer support automation',
            description: 'Advanced chatbot leveraging GPT-4 API for natural language understanding. Integrates with knowledge base for context-aware responses.',
            technologies: ['Node.js', 'React', 'OpenAI API', 'Pinecone', 'PostgreSQL'],
            metrics: [
                { label: 'Response Accuracy', value: '94%' },
                { label: 'Resolution Rate', value: '87%' },
                { label: 'Daily Conversations', value: '5K+' },
                { label: 'Avg Response Time', value: '1.2s' },
            ],
            highlights: [
                'GPT-4 integration for natural language processing',
                'Vector embeddings for semantic search',
                'Fallback to human agents when needed',
                'Multi-language support',
                'Conversation analytics and sentiment analysis',
            ],
            architecture: {
                layers: [
                    'Frontend: React chat UI with real-time messaging',
                    'Backend: Node.js with streaming responses',
                    'AI Engine: OpenAI GPT-4 API with prompt engineering',
                    'Vector DB: Pinecone for knowledge base embeddings',
                    'Database: PostgreSQL for conversation history',
                ],
                description: 'AI-augmented support system with human handoff capability',
            },
            demoUrl: 'https://chatbot-demo.vercel.app',
            githubUrl: 'https://github.com/adityasankranthi/ai-support-chatbot',
            status: 'In Progress',
            emoji: '🤖',
        },
        {
            id: '5',
            title: 'Real-Time Data Dashboard',
            category: 'experimental',
            shortDescription: 'Live analytics and monitoring platform',
            description: 'Real-time analytics dashboard for system monitoring and business metrics visualization.',
            technologies: ['React', 'WebSocket', 'D3.js', 'Node.js', 'PostgreSQL'],
            metrics: [
                { label: 'Data Points/sec', value: '10K+' },
                { label: 'Latency', value: '< 500ms' },
                { label: 'Concurrent Users', value: '1K+' },
                { label: 'Uptime', value: '99.95%' },
            ],
            highlights: [
                'WebSocket for real-time data streaming',
                'D3.js visualizations with smooth transitions',
                'Multiple chart types and custom dashboards',
                'Alerting system for threshold violations',
                'Data export to CSV/PDF',
            ],
            architecture: {
                layers: [
                    'Frontend: React with Redux for state management',
                    'Real-time: WebSocket server with Socket.io',
                    'Visualization: D3.js for dynamic charts',
                    'Backend: Node.js with express',
                    'Database: PostgreSQL with time-series optimization',
                    'Caching: Redis for hot data',
                ],
                description: 'Event-driven architecture for low-latency data delivery',
            },
            status: 'Completed',
            emoji: '📊',
        },
        {
            id: '6',
            title: 'DevOps Automation Toolkit',
            category: 'learning',
            shortDescription: 'Infrastructure automation and deployment tools',
            description: 'Comprehensive toolkit for automating deployment, scaling, and monitoring of microservices.',
            technologies: ['Python', 'Bash', 'Docker', 'Kubernetes', 'Terraform', 'Prometheus'],
            metrics: [
                { label: 'Deployment Time', value: '5 min' },
                { label: 'Automation Rate', value: '95%' },
                { label: 'Environments Managed', value: '10+' },
                { label: 'Cost Savings', value: '40%' },
            ],
            highlights: [
                'One-command deployment with rollback capability',
                'Automated scaling policies based on metrics',
                'Infrastructure as Code with Terraform',
                'Prometheus monitoring and alerting',
                'CI/CD pipeline automation',
                'Disaster recovery procedures',
            ],
            architecture: {
                layers: [
                    'Orchestration: Kubernetes for container management',
                    'IaC: Terraform for infrastructure provisioning',
                    'CI/CD: GitHub Actions for automated deployments',
                    'Monitoring: Prometheus + Grafana for metrics',
                    'Logging: ELK Stack for centralized logs',
                    'Backup: Automated snapshots and redundancy',
                ],
                description: 'GitOps workflow with automated infrastructure management',
            },
            status: 'Completed',
            emoji: '⚙️',
        },
    ];

    const categories = [
        { key: 'featured' as const, label: 'Featured Projects', icon: '⭐' },
        { key: 'learning' as const, label: 'Learning Projects', icon: '📚' },
        { key: 'experimental' as const, label: 'Experimental', icon: '🔬' },
    ];

    const filteredProjects = projects.filter((p) => p.category === selectedCategory);

    return (
        <section id="projects" className="py-20 px-4 bg-background relative">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-6xl mx-auto mb-16"
            >
                <h2 className="text-4xl sm:text-5xl font-bold text-text mb-4">Projects & Innovations</h2>
                <p className="text-lg text-text-muted">Featured work showcasing technical expertise and problem-solving</p>
            </motion.div>

            <div className="max-w-6xl mx-auto">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-4 mb-12 justify-center">
                    {categories.map((category) => (
                        <motion.button
                            key={category.key}
                            onClick={() => setSelectedCategory(category.key)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                                selectedCategory === category.key
                                    ? 'bg-gradient-to-r from-blue-500 to-blue-500 text-black shadow-lg shadow-blue-500/50'
                                    : 'bg-slate-800/50 border border-blue-400/30 text-text hover:border-blue-400/60'
                            }`}
                        >
                            <span className="mr-2">{category.icon}</span>
                            {category.label}
                        </motion.button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    <AnimatePresence mode="wait">
                        {filteredProjects.map((project, idx) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: idx * 0.1 }}
                                onClick={() => setSelectedProject(project)}
                                className="group cursor-pointer"
                            >
                                <motion.div
                                    whileHover={{ y: -8 }}
                                    className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-blue-400/20 rounded-lg p-6 h-full hover:border-blue-400/50 transition-all hover:shadow-xl hover:shadow-blue-400/20"
                                >
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-3xl">{project.emoji}</span>
                                                <span className={`text-xs font-bold px-2 py-1 rounded ${
                                                    project.status === 'Live'
                                                        ? 'bg-green-500/20 text-green-400'
                                                        : project.status === 'In Progress'
                                                        ? 'bg-yellow-500/20 text-yellow-400'
                                                        : 'bg-blue-500/20 text-blue-400'
                                                }`}>
                                                    {project.status}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-text">{project.title}</h3>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-text-muted mb-4">{project.shortDescription}</p>

                                    {/* Metrics Preview */}
                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        {project.metrics.slice(0, 2).map((metric, idx) => (
                                            <div key={idx} className="bg-black/30 p-2 rounded border border-blue-400/20">
                                                <div className="text-blue-400 font-bold text-sm">{metric.value}</div>
                                                <div className="text-xs text-text-muted">{metric.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.slice(0, 3).map((tech) => (
                                            <span key={tech} className="text-xs bg-blue-400/10 text-blue-300 px-2 py-1 rounded border border-blue-400/20">
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies.length > 3 && (
                                            <span className="text-xs bg-blue-400/10 text-blue-300 px-2 py-1 rounded border border-blue-400/20">
                                                +{project.technologies.length - 3}
                                            </span>
                                        )}
                                    </div>

                                    {/* View Details Button */}
                                    <motion.div
                                        className="text-blue-400 text-sm font-semibold group-hover:translate-x-2 transition-transform flex items-center gap-2"
                                    >
                                        View Details
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Project Detail Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => {
                            setSelectedProject(null);
                            setShowArchitecture(false);
                        }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gradient-to-br from-slate-900 to-slate-800 border border-blue-400/30 rounded-lg max-w-3xl max-h-[90vh] overflow-y-auto"
                        >
                            {/* Header */}
                            <div className="sticky top-0 bg-black/50 border-b border-blue-400/30 px-8 py-6 flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-4xl">{selectedProject.emoji}</span>
                                        <h2 className="text-3xl font-bold text-text">{selectedProject.title}</h2>
                                    </div>
                                    <p className="text-text-muted">{selectedProject.description}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        setSelectedProject(null);
                                        setShowArchitecture(false);
                                    }}
                                    className="text-text-muted hover:text-text transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Content */}
                            <div className="px-8 py-6 space-y-8">
                                {/* Metrics */}
                                <div>
                                    <h3 className="text-xl font-bold text-text mb-4">Key Metrics</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {selectedProject.metrics.map((metric, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="bg-black/30 border border-blue-400/30 p-4 rounded-lg"
                                            >
                                                <div className="text-2xl font-bold text-blue-400">{metric.value}</div>
                                                <div className="text-sm text-text-muted">{metric.label}</div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Highlights */}
                                <div>
                                    <h3 className="text-xl font-bold text-text mb-4">Key Features</h3>
                                    <ul className="space-y-2">
                                        {selectedProject.highlights.map((highlight, idx) => (
                                            <motion.li
                                                key={idx}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="flex items-start gap-3 text-text-muted"
                                            >
                                                <span className="text-blue-400 mt-1">✓</span>
                                                <span>{highlight}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Technologies */}
                                <div>
                                    <h3 className="text-xl font-bold text-text mb-4">Tech Stack</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.technologies.map((tech) => (
                                            <motion.span
                                                key={tech}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="bg-gradient-to-r from-blue-400/20 to-blue-400/20 text-blue-300 px-3 py-1.5 rounded-full text-sm border border-blue-400/50"
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>

                                {/* Architecture */}
                                {selectedProject.architecture && (
                                    <div>
                                        <motion.button
                                            onClick={() => setShowArchitecture(!showArchitecture)}
                                            className="flex items-center gap-2 text-blue-400 font-semibold mb-4 hover:text-blue-300 transition-colors"
                                        >
                                            <svg className={`w-5 h-5 transition-transform ${showArchitecture ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                            System Architecture
                                        </motion.button>

                                        <AnimatePresence>
                                            {showArchitecture && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="bg-black/30 border border-blue-400/30 p-4 rounded-lg space-y-3"
                                                >
                                                    <p className="text-text-muted text-sm">{selectedProject.architecture.description}</p>
                                                    <div className="space-y-2">
                                                        {selectedProject.architecture.layers.map((layer, idx) => (
                                                            <motion.div
                                                                key={idx}
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: idx * 0.05 }}
                                                                className="flex items-start gap-3 text-sm text-text-muted"
                                                            >
                                                                <span className="text-blue-400 mt-0.5">→</span>
                                                                <span>{layer}</span>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )}

                                {/* CTA Links */}
                                <div className="flex gap-4 pt-4 border-t border-blue-400/20">
                                    {selectedProject.demoUrl && (
                                        <motion.a
                                            href={selectedProject.demoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05 }}
                                            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-500 text-black font-bold py-2 px-4 rounded-lg text-center hover:shadow-lg hover:shadow-blue-500/50 transition-all"
                                        >
                                            👀 View Demo
                                        </motion.a>
                                    )}
                                    {selectedProject.githubUrl && (
                                        <motion.a
                                            href={selectedProject.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05 }}
                                            className="flex-1 bg-slate-700 hover:bg-slate-600 text-text font-bold py-2 px-4 rounded-lg text-center transition-all border border-blue-400/30"
                                        >
                                            🐙 Source Code
                                        </motion.a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default EnhancedProjects;
