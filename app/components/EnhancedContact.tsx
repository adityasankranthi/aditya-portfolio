'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

const CalendarComponent = dynamic(() => import('react-calendar'), { 
  ssr: false,
  loading: () => <div className="p-4 text-gray-400">Loading calendar...</div>
});

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export default function EnhancedContact() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<FormStatus>({ type: 'idle', message: '' });
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const socialLinks = [
    { icon: '[LinkedIn]', name: 'LinkedIn', url: 'https://linkedin.com/in/adityasankranthi', color: 'hover:text-blue-400' },
    { icon: '[GitHub]', name: 'GitHub', url: 'https://github.com/adityasankranthi', color: 'hover:text-gray-300' },
    { icon: '[Twitter]', name: 'X/Twitter', url: 'https://twitter.com/adityasankranthi', color: 'hover:text-blue-400' },
    { icon: '[Email]', name: 'Email', url: 'mailto:aditya@example.com', color: 'hover:text-blue-400' },
  ];

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setFormStatus({ type: 'error', message: 'Name is required' });
      return false;
    }
    if (!validateEmail(formData.email)) {
      setFormStatus({ type: 'error', message: 'Please enter a valid email' });
      return false;
    }
    if (!formData.message.trim()) {
      setFormStatus({ type: 'error', message: 'Message cannot be empty' });
      return false;
    }
    if (formData.message.trim().length < 10) {
      setFormStatus({ type: 'error', message: 'Message must be at least 10 characters' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setFormStatus({ type: 'loading', message: 'Sending...' });

    try {
      // Simulate API call - in production, this would send to your backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormStatus({ type: 'success', message: 'Message sent! I\'ll get back to you soon ' });
      setShowSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setShowSuccess(false);
        setFormStatus({ type: 'idle', message: '' });
      }, 4000);
    } catch (error) {
      setFormStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormStatus({ type: 'idle', message: '' });
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const isFutureDate = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  return (
    <section id="contact" className="relative py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-background via-background to-background/80 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-blue-400 to-blue-400 bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a project in mind or want to chat? I'm always open to new opportunities and interesting conversations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative bg-background border border-blue-500/30 rounded-lg p-8">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-semibold text-blue-300 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="w-full bg-background/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                    disabled={formStatus.type === 'loading'}
                  />
                </motion.div>

                {/* Email Input */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-semibold text-blue-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="w-full bg-background/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                    disabled={formStatus.type === 'loading'}
                  />
                </motion.div>

                {/* Message Textarea */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <label className="block text-sm font-semibold text-blue-300 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project or just say hi..."
                    rows={5}
                    className="w-full bg-background/50 border border-blue-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all resize-none"
                    disabled={formStatus.type === 'loading'}
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {formData.message.length}/500 characters
                  </div>
                </motion.div>

                {/* Status Messages */}
                <AnimatePresence>
                  {formStatus.message && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`p-3 rounded-lg text-sm font-medium ${
                        formStatus.type === 'success'
                          ? 'bg-blue-500/20 text-green-300 border border-blue-500/30'
                          : formStatus.type === 'error'
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}
                    >
                      {formStatus.message}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={formStatus.type === 'loading'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-400 to-blue-400 text-background font-bold py-3 px-6 rounded-lg transition-all hover:shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formStatus.type === 'loading' ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Calendar + Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Calendar Section */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative bg-background border border-blue-500/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-300 mb-4 flex items-center gap-2">
                  <span className="text-2xl"></span>
                  Schedule Your Time
                </h3>
                
                <motion.button
                  onClick={() => setShowCalendar(!showCalendar)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-500/20 to-blue-500/20 border border-blue-500/30 text-white rounded-lg px-4 py-3 font-semibold hover:border-blue-400 transition-all mb-4"
                >
                  {formatDate(selectedDate)} 📍
                </motion.button>

                <AnimatePresence>
                  {showCalendar && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-background/50 border border-blue-500/30 rounded-lg p-4 mb-4 overflow-hidden"
                    >
                      <div className="text-sm text-gray-400 mb-3">
                        <p>Select a date for a consultation call (15-60 min)</p>
                      </div>
                      <div className="bg-background rounded p-3 border border-blue-500/20">
                        <CalendarComponent
                          value={selectedDate}
                          onChange={(date: any) => {
                            if (Array.isArray(date)) {
                              setSelectedDate(date[0]);
                            } else {
                              setSelectedDate(date);
                            }
                          }}
                          minDate={new Date()}
                          tileDisabled={({ date }: { date: any }) => !isFutureDate(date)}
                          className="calendar-custom w-full text-white"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.a
                  href="https://calendly.com/adityasankranthi/consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full inline-block text-center bg-gradient-to-r from-blue-400 to-blue-400 text-background font-bold py-3 px-4 rounded-lg transition-all hover:shadow-lg hover:shadow-blue-500/50"
                >
                  Schedule on Calendly ↗️
                </motion.a>

                <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm text-gray-300">
                  <p> <strong>Tip:</strong> You can book a time for a quick chat, code review, or project discussion.</p>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative bg-background border border-blue-500/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                  <span className="text-2xl"></span>
                  Get in Touch
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.25 + index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className={`group/link p-4 bg-gradient-to-br from-blue-500/10 to-blue-500/10 border border-blue-500/30 rounded-lg hover:border-blue-400 transition-all text-center ${link.color}`}
                    >
                      <div className="text-3xl mb-2 group-hover/link:scale-125 transition-transform">
                        {link.icon}
                      </div>
                      <p className="text-sm font-semibold text-white">{link.name}</p>
                    </motion.a>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm text-gray-300">
                  <p>✨ <strong>Quick response:</strong> I usually reply within 24 hours.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          <motion.div whileHover={{ y: -5 }} className="group bg-gradient-to-br from-blue-500/10 to-blue-500/10 border border-blue-500/30 rounded-lg p-6 hover:border-blue-400 transition-all">
            <div className="text-3xl mb-3"></div>
            <h4 className="text-lg font-semibold text-white mb-2">Quick Response</h4>
            <p className="text-gray-400 text-sm">I respond to most inquiries within 24 hours</p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="group bg-gradient-to-br from-blue-500/10 to-blue-500/10 border border-blue-500/30 rounded-lg p-6 hover:border-blue-400 transition-all">
            <div className="text-3xl mb-3"></div>
            <h4 className="text-lg font-semibold text-white mb-2">Open to Opportunities</h4>
            <p className="text-gray-400 text-sm">Freelance projects, full-time roles, and collaborations</p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="group bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-6 hover:border-purple-400 transition-all">
            <div className="text-3xl mb-3"></div>
            <h4 className="text-lg font-semibold text-white mb-2">Always Learning</h4>
            <p className="text-gray-400 text-sm">Happy to discuss new tech, ideas, and industry trends</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Success Confetti Animation */}
      <AnimatePresence>
        {showSuccess && (
          <>
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 1, 
                  y: 0, 
                  x: 0,
                  rotate: 0
                }}
                animate={{ 
                  opacity: 0, 
                  y: -300, 
                  x: (Math.random() - 0.5) * 200,
                  rotate: Math.random() * 360
                }}
                transition={{ 
                  duration: 3, 
                  ease: 'easeOut',
                  delay: Math.random() * 0.2
                }}
                className="fixed pointer-events-none"
                style={{
                  left: '50%',
                  top: '50%',
                  fontSize: ['🎉', '✨', '', '💫', '⭐'][Math.floor(Math.random() * 5)]
                }}
              >
                {['🎉', '✨', '', '💫', '⭐'][Math.floor(Math.random() * 5)]}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
