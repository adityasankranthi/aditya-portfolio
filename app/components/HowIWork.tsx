'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WorkflowStep {
  id: string;
  icon: string;
  title: string;
  description: string;
  tools: string[];
  color: string;
}

interface Principle {
  icon: string;
  title: string;
  description: string;
}

interface DeveloperTool {
  icon: string;
  name: string;
  description: string;
}

export default function HowIWork() {
  const [selectedStep, setSelectedStep] = useState<string | null>('plan');

  const workflowSteps: WorkflowStep[] = [
    {
      id: 'plan',
      icon: '📋',
      title: 'Plan',
      description: 'Break down problems into actionable tasks, design architecture, and define requirements.',
      tools: ['Figma', 'Notion', 'Miro'],
      color: 'from-blue-500 to-blue-500'
    },
    {
      id: 'code',
      icon: '',
      title: 'Code',
      description: 'Write clean, maintainable code with best practices and design patterns.',
      tools: ['VS Code', 'TypeScript', 'Git'],
      color: 'from-blue-500 to-purple-500'
    },
    {
      id: 'test',
      icon: '',
      title: 'Test',
      description: 'Ensure quality through unit tests, integration tests, and manual verification.',
      tools: ['Jest', 'Cypress', 'Postman'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'deploy',
      icon: '',
      title: 'Deploy',
      description: 'Deploy with confidence using CI/CD pipelines and monitoring.',
      tools: ['Docker', 'Vercel', 'GitHub Actions'],
      color: 'from-pink-500 to-red-500'
    },
    {
      id: 'maintain',
      icon: '',
      title: 'Maintain',
      description: 'Monitor performance, fix bugs, optimize, and continuously improve.',
      tools: ['Datadog', 'Sentry', 'LogRocket'],
      color: 'from-red-500 to-orange-500'
    }
  ];

  const principles: Principle[] = [
    {
      icon: '',
      title: 'Focus on Impact',
      description: 'Every line of code should create measurable value for users.'
    },
    {
      icon: '🧠',
      title: 'Think Ahead',
      description: 'Design for scalability, maintainability, and future requirements.'
    },
    {
      icon: '🤝',
      title: 'Collaborate',
      description: 'Clear communication and code reviews lead to better solutions.'
    },
    {
      icon: '',
      title: 'Keep Learning',
      description: 'Stay updated with trends, best practices, and new technologies.'
    },
    {
      icon: '',
      title: 'Optimize',
      description: 'Performance and user experience are never "good enough".'
    },
    {
      icon: '',
      title: 'Secure First',
      description: 'Security is built into every layer, not added as afterthought.'
    }
  ];

  const tools: DeveloperTool[] = [
    {
      icon: '',
      name: 'VS Code',
      description: 'Primary development environment with extensions for productivity'
    },
    {
      icon: '',
      name: 'Git',
      description: 'Version control for tracking changes and collaboration'
    },
    {
      icon: '',
      name: 'Docker',
      description: 'Containerization for consistent development and deployment'
    },
    {
      icon: '',
      name: 'Postman',
      description: 'API testing and documentation for backend development'
    },
    {
      icon: '',
      name: 'Chrome DevTools',
      description: 'Debugging and performance profiling for frontend'
    },
    {
      icon: '',
      name: 'Slack',
      description: 'Team communication and integration with development tools'
    }
  ];

  return (
    <section className="relative py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-background via-background to-background/80 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              How I Work
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My development process is built on structured planning, quality code, rigorous testing, reliable deployment, and continuous improvement.
          </p>
        </motion.div>

        {/* Workflow Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-20"
        >
          {workflowSteps.map((step, index) => (
            <motion.button
              key={step.id}
              onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className={`relative bg-gradient-to-br ${step.color} p-0.5 rounded-lg`}>
                <div className="bg-background rounded-lg p-6 h-full flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 group-hover:scale-105">
                  <motion.div
                    animate={selectedStep === step.id ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
                    className="text-4xl mb-3"
                  >
                    {step.icon}
                  </motion.div>
                  <h3 className="text-lg font-bold text-white">{step.title}</h3>
                  <div className="text-xs text-gray-500 mt-2">Click to expand</div>
                </div>
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {selectedStep === step.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-background border border-blue-500/30 rounded-lg p-4 z-20 backdrop-blur"
                  >
                    <p className="text-sm text-gray-300 mb-3">{step.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {step.tools.map((tool) => (
                        <span key={tool} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded border border-blue-500/30">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </motion.div>

        {/* Development Principles */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-10">
            <span className="bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent">
              Core Principles
            </span>
          </h3>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 0.95 }}
                className="group bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-6 cursor-pointer transition-all hover:border-blue-500/40"
              >
                <div className="text-3xl mb-3 group-hover:scale-125 transition-transform duration-300">{principle.icon}</div>
                <h4 className="text-lg font-semibold text-white mb-2">{principle.title}</h4>
                <p className="text-sm text-gray-400">{principle.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Daily Tools */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-center mb-10">
            <span className="bg-gradient-to-r from-blue-400 to-blue-400 bg-clip-text text-transparent">
              My Daily Toolkit
            </span>
          </h3>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group bg-gradient-to-br from-blue-500/10 to-blue-500/10 border border-blue-500/20 rounded-lg p-6 transition-all hover:border-blue-500/40"
              >
                <motion.div
                  className="text-3xl mb-3 cursor-pointer"
                  whileHover={{ rotate: 20, scale: 1.2 }}
                >
                  {tool.icon}
                </motion.div>
                <h4 className="text-lg font-semibold text-white mb-2">{tool.name}</h4>
                <p className="text-sm text-gray-400">{tool.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">Ready to see me in action?</p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gradient-to-r from-blue-400 to-blue-400 text-background font-bold py-3 px-8 rounded-lg transition-all hover:shadow-lg hover:shadow-blue-500/50"
          >
            Let's Talk 
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
