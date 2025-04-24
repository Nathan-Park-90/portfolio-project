import React from 'react';
import { useParams, Navigate } from 'react-router-dom'; // Import Navigate for redirect/handling not found
import { motion } from 'framer-motion';
import styles from './ProjectDetailPage.module.css';
import { projects } from '../../data/projects'; // Import project data
import ProjectContentDisplay from '../../components/ProjectContentDisplay/ProjectContentDisplay'; // Import the reusable component
// Optional: Import your dedicated NotFoundPage component if you prefer rendering it directly
// import NotFoundPage from '../NotFoundPage/NotFoundPage';

function ProjectDetailPage() {
    const { projectId } = useParams(); // Get project ID from URL parameter
    const project = projects.find((p) => p.id === projectId);

    // Handle project not found
    if (!project) {
        // Option 1: Render a dedicated Not Found component directly (if imported)
        // return <NotFoundPage />;

        // Option 2: Navigate to the 404 route (requires a '*' route setup in App.js)
        // This might be cleaner as it keeps the URL consistent with the error state.
        // Note: Using <Navigate> directly might cause issues with AnimatePresence transitions.
        // A better pattern is often to handle this in the routing layer or return a specific component.
        // For simplicity here, let's return a clear message or the NotFoundPage component.
        return (
            <div className={styles.notFoundContainer}> {/* Add specific styling */}
                <h1>Project Not Found</h1>
                <p>Sorry, we couldn't find the project you were looking for.</p>
                <a href="/projects">Back to Projects</a> {/* Simple link back */}
            </div>
        );
         // Or simply: return <NotFoundPage />;
    }

    return (
        <motion.div
            className={styles.container}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Project Title */}
            <h1 className={styles.projectTitle}>{project.title}</h1>

            {/* Optional: Display short description or technologies */}
            {project.shortDescription && <p className={styles.shortDescription}>{project.shortDescription}</p>}
            {project.technologies && (
                <div className={styles.technologies}>
                    <strong>Technologies:</strong> {project.technologies.join(', ')}
                </div>
            )}


            {/* Use the reusable component to display the main content (PDF, Image, or Long Description) */}
            <div className={styles.projectContent}>
                <ProjectContentDisplay project={project} />
            </div>

             {/* Add Project Links if they exist */}
             {(project.githubLink || project.liveDemoLink) && (
                 <div className={styles.projectLinks}>
                    {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className={styles.linkButton}>
                            View on GitHub
                        </a>
                    )}
                    {project.liveDemoLink && (
                        <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer" className={styles.linkButton}>
                            View Live Demo
                        </a>
                    )}
                </div>
             )}

        </motion.div>
    );
}

export default ProjectDetailPage;