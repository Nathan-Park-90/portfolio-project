import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Keep Link for navigation
import styles from './HomePage.module.css';
import { projects } from '../../data/projects';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import Button from '../../components/Button/Button'; // Import the Button component

function HomePage() {
  return (
    <motion.div
      className={styles.container}
      // ... animation props ...
    >
      <section className={styles.hero}>
        <h1 className={styles.title}>Hi, I&apos;m [Your Name]</h1>
        <p className={styles.subtitle}>A [Your Major] student passionate about [Your Interests].</p>
        {/* Wrap the Button component within the Link */}
        <Link to="/projects" className={styles.heroLink}> {/* Use a generic class for the Link if needed */}
          <Button>View My Work</Button> {/* Use Button Component */}
        </Link>
      </section>

      {/* ... featured projects section ... */}
       <section className={styles.featuredProjects}>
        <h2>Featured Projects</h2>
        <div className={styles.projectGrid}>
          {projects.slice(0, 3).map((project) => (
            // Assuming ProjectCard needs an onClick handler now for consistency
            <ProjectCard key={project.id} project={project} onClick={() => { /* Navigate or open modal */ }} />
          ))}
        </div>
      </section>
    </motion.div>
  );
}

export default HomePage;