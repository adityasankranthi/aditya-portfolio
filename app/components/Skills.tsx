'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Skill {
  category: string;
  skills: string[];
  proficiency: 'Expert' | 'Proficient' | 'Experienced';
}

export default function Skills() {
  const skillsData: Skill[] = [
    {
      category: 'Frontend',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js', 'HTML/CSS'],
      proficiency: 'Expert'
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Express.js', 'Python', 'PostgreSQL', 'MongoDB', 'REST APIs'],
      proficiency: 'Expert'
    },
    {
      category: 'Cloud & DevOps',
      skills: ['Docker', 'AWS', 'CI/CD', 'GitHub Actions', 'Kubernetes', 'Linux'],
      proficiency: 'Proficient'
    },
    {
      category: 'Tools & Platforms',
      skills: ['Git', 'Webpack', 'Jest', 'Cypress', 'Postman', 'VS Code'],
      proficiency: 'Expert'
    },
    {
      category: 'Architecture',
      skills: ['Microservices', 'System Design', 'Database Design', 'API Design', 'Scalability'],
      proficiency: 'Proficient'
    },
    {
      category: 'Methodologies',
      skills: ['Agile', 'Test-Driven Development', 'Code Review', 'Documentation', 'Problem Solving'],
      proficiency: 'Experienced'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technical Skills
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A comprehensive toolkit built over 5+ years of full-stack development
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillsData.map((skillGroup, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-slate-500/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-blue-500 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">{skillGroup.category}</h3>
                  <span className="text-xs font-semibold px-3 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {skillGroup.proficiency}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {skillGroup.skills.map((skill, skillIdx) => (
                    <motion.span
                      key={skillIdx}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-2 bg-slate-700/50 text-slate-300 rounded text-sm font-medium hover:bg-blue-500/20 hover:text-blue-300 transition-colors cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { label: 'Years Experience', value: '5+' },
            { label: 'Projects Completed', value: '25+' },
            { label: 'Technologies', value: '30+' },
            { label: 'Team Collaborations', value: '10+' }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="text-center p-6 bg-slate-800 border border-slate-700 rounded-lg"
            >
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
