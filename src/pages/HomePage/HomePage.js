import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Keep Link for navigation
import styles from './HomePage.module.css';
import { projects } from '../../data/projects';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import Button from '../../components/Button/Button'; // Import the Button component

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const projectVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

function HomePage() {
  return (
    <motion.div
      className={styles.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
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
          {projects.slice(0, 3).map((project, index) => (
            <motion.div
              key={project.id}
              variants={projectVariants}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

export default HomePage;