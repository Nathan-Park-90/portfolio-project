import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <motion.nav
      className={styles.navbar}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Link to="/" className={styles.logo}>Your Name</Link>
      <ul className={styles.navList}>
        <motion.li whileHover={{ scale: 1.1 }}><Link to="/about">About</Link></motion.li>
        <motion.li whileHover={{ scale: 1.1 }}><Link to="/projects">Projects</Link></motion.li>
        <motion.li whileHover={{ scale: 1.1 }}><Link to="/contact">Contact</Link></motion.li>
      </ul>
    </motion.nav>
  );
}

export default Navbar;