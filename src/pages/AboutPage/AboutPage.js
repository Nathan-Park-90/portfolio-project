import React from 'react';
import { motion } from 'framer-motion';
import styles from './AboutPage.module.css';

function AboutPage() {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>About Me</h1>
      <p>
        Write a compelling introduction about yourself here.  Talk about your
        skills, your passions, and your career goals.  Include a photo!
      </p>
      {/* Add more content, like your skills, education, etc. */}
    </motion.div>
  );
}

export default AboutPage;