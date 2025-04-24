import React, { useEffect, useRef } from 'react'; // Import useEffect, useRef
import { motion } from 'framer-motion';
import PropTypes from 'prop-types'; // If using prop-types
import styles from './ProjectModal.module.css';
import ProjectContentDisplay from '../ProjectContentDisplay/ProjectContentDisplay';

function ProjectModal({ project, onClose }) {
    const modalRef = useRef(null);
    const closeButtonRef = useRef(null); // Ref for the close button

    // Focus trapping and Escape key handling
    useEffect(() => {
        if (project && modalRef.current && closeButtonRef.current) {
            const focusableElements = modalRef.current.querySelectorAll(
                'a[href], button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
            // Ensure focusableElements is an array before accessing indices
            const elementsArray = Array.from(focusableElements);
            const firstElement = elementsArray[0];
            const lastElement = elementsArray[elementsArray.length - 1];

            const handleKeyDown = (e) => {
                if (e.key === 'Escape') {
                    onClose();
                    return;
                }

                if (e.key === 'Tab') {
                  // If no focusable elements, prevent tabbing
                  if (elementsArray.length === 0) {
                      e.preventDefault();
                      return;
                  }
                    // Check if focus is about to leave the modal
                    if (e.shiftKey) { // Shift + Tab
                        if (document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        }
                    } else { // Tab
                        if (document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                }
            };

            // Focus the close button (or first focusable element) when the modal opens
            closeButtonRef.current.focus();

            document.addEventListener('keydown', handleKeyDown);
            // Cleanup function
            return () => {
                document.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [project, onClose]); // Re-run if project or onClose changes

    if (!project) return null;

    return (
        <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose} // Close on overlay click
        >
            <motion.div
                ref={modalRef} // Assign ref to the modal content
                className={styles.modalContent}
                role="dialog" // ARIA: Identify as dialog
                aria-modal="true" // ARIA: Indicate it's modal
                aria-labelledby="modalTitle" // ARIA: Link to title
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()} // Prevent overlay click when clicking inside
            >
                {/* Add id for aria-labelledby */}
                <h2 id="modalTitle" className={styles.modalTitle}>{project.title}</h2>

                {/* Make close button accessible */}
                <button
                    ref={closeButtonRef} // Assign ref for initial focus
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Close modal" // ARIA: Screen reader label
                >
                   &times; {/* Use HTML entity for visual 'X' */}
                </button>

                <div className={styles.projectBody}>
                  <ProjectContentDisplay project={project} />
                </div>

                <div className={styles.projectLinks}>
                    {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer">GitHub</a>}
                    {project.liveDemoLink && <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer">Live Demo</a>}
                </div>
            </motion.div>
        </motion.div>
    );
}

// Add PropTypes for ProjectModal
ProjectModal.propTypes = {
    project: PropTypes.object, // Or more specific shape
    onClose: PropTypes.func.isRequired,
};

export default ProjectModal;