import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types'; // Recommended: Add PropTypes
import styles from './ProjectCard.module.css';

// Define path to your fallback image (put it in public/images or src/assets)
const FALLBACK_IMAGE = '/images/placeholder-fallback.png'; // Example path

function ProjectCard({ project, onClick }) {

  const handleImageError = (e) => {
    // Prevent infinite loop if fallback itself fails
    if (e.target.src !== FALLBACK_IMAGE) {
      e.target.onerror = null; // Important: remove handler after first error
      e.target.src = FALLBACK_IMAGE;
      e.target.alt = 'Image failed to load'; // Update alt text
    }
  };

  return (
    <motion.div
      className={styles.card}
      whileHover={{ scale: 1.05, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onClick={onClick}
      // Add tabIndex to make the div focusable if it's clickable
      tabIndex={0}
      onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()} // Allow activation with Enter/Space
    >
      <img
        src={project.imageUrl || FALLBACK_IMAGE} // Use fallback if URL is initially missing
        alt={project.title}
        className={styles.image}
        onError={handleImageError} // Add the onError handler
        loading="lazy" // Add native lazy loading
      />
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.description}>{project.shortDescription}</p>
    </motion.div>
  );
}

// Recommended: Add PropTypes
ProjectCard.propTypes = {
    project: PropTypes.shape({
        imageUrl: PropTypes.string,
        title: PropTypes.string.isRequired,
        shortDescription: PropTypes.string.isRequired,
        // ... other project props
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ProjectCard;