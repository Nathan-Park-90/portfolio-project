import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './ProjectDetailPage.module.css';
import { projects } from '../../data/projects'; // Import project data

function ProjectDetailPage() {
  const { projectId } = useParams(); // Get project ID from URL
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return <div>Project not found!</div>;
  }

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>{project.title}</h1>
      {/* Add detailed project content here */}
      <p>{project.longDescription}</p>
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
    </motion.div>
  );
}

export default ProjectDetailPage;