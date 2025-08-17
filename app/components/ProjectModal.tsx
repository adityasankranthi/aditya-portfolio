import React from 'react';
import { motion } from 'framer-motion';

interface Project {
  title: string;
  longDescription: string;
  modalImageUrl: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-80 z-[60] flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                onClick={(e) => e.stopPropagation()}
                className="bg-primary rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col border border-white/10"
            >
                <div className="p-4 flex justify-between items-center border-b border-white/10">
                    <h3 className="text-xl font-bold text-accent">{project.title}</h3>
                    <button onClick={onClose} className="text-text-muted hover:text-text text-3xl leading-none">&times;</button>
                </div>
                <div className="p-6 overflow-y-auto">
                    <img src={project.modalImageUrl} alt={project.title} className="w-full h-auto rounded-lg mb-6" />
                    <p className="text-text-muted">{project.longDescription}</p>
                </div>
                <div className="p-4 border-t border-white/10 text-right">
                    <button onClick={onClose} className="bg-accent text-white py-2 px-4 rounded-full text-sm font-semibold hover:bg-accent-hover transition-colors">Close</button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProjectModal;