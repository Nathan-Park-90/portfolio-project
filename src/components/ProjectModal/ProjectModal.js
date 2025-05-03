import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProjectModal.module.css';

function ProjectModal({ project, onClose }) {
    if (!project) return null;  // Don't render if no project is provided

    return (
        <AnimatePresence>
            <motion.div
                className={styles.modalOverlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose} // Close when clicking outside the modal
            >
                <motion.div
                    className={styles.modalContent}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
                >
                    <button className={styles.closeButton} onClick={onClose}>×</button>
                    <h2>{project.title}</h2>
                    <img src={project.imageUrl} alt={project.title} className={styles.modalImage} />

                    {/* Display content based on type */}
                    {project.type === 'pdf' ? (
                      <object data={project.content} type="application/pdf" width="100%" height="600px">
                        <p>It appears you don't have a PDF plugin for this browser.
                           You can <a href={project.content}>download the PDF file.</a></p>
                      </object>

                    ) : project.type === 'image' ? (
                      <img src={project.content} alt={project.title}  width="100%"/>
                    ) : (
                      <p>{project.longDescription}</p> // Default to long description
                    )}

                    <div className={styles.technologies}>
                        {project.technologies.map((tech) => (
                            <span key={tech} className={styles.techTag}>{tech}</span>
                        ))}
                    </div>

                    <div className={styles.links}>
                        {project.githubLink && (
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                GitHub
                            </a>
                        )}
                        {project.liveDemoLink && (
                            <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                Live Demo
                            </a>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default ProjectModal;