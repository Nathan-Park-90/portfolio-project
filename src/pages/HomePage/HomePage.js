import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import { projects } from '../../data/projects';
import ProjectCard from '../../components/ProjectCard/ProjectCard';

function HomePage() {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className={styles.hero}>
        <h1 className={styles.title}>Hi, I'm [Your Name]</h1>
        <p className={styles.subtitle}>A [Your Major] student passionate about [Your Interests].</p>
        <Link to="/projects" className={styles.button}>View My Work</Link>
      </section>

      <section className={styles.featuredProjects}>
        <h2>Featured Projects</h2>
        <div className={styles.projectGrid}>
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </motion.div>
  );
}

export default HomePage;