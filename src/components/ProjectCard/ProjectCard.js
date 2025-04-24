import React from 'react';
import { motion } from 'framer-motion';
import styles from './ProjectCard.module.css';

function ProjectCard({ project, onClick }) {
  return (
    <motion.div
      className={styles.card}
      whileHover={{ scale: 1.05, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onClick={onClick} // Add onClick handler
    >
      <img src={project.imageUrl} alt={project.title} className={styles.image} />
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.description}>{project.shortDescription}</p>
    </motion.div>
  );
}

export default ProjectCard;