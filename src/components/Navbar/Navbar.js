import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // Import NavLink
import { motion } from 'framer-motion';
import styles from './Navbar.module.css';

function Navbar() {
  // Function to determine className based on active state
  const getNavLinkClass = ({ isActive }) => {
    return `${styles.navLink} ${isActive ? styles.active : ''}`.trim();
  };

  return (
    <motion.nav
      className={styles.navbar}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Link to="/" className={styles.logo}>Your Name</Link>
      <ul className={styles.navList}>
        <motion.li whileHover={{ scale: 1.1 }}>
          <NavLink to="/about" className={getNavLinkClass}>About</NavLink>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }}>
          <NavLink to="/projects" className={getNavLinkClass}>Projects</NavLink>
        </motion.li>
        <motion.li whileHover={{ scale: 1.1 }}>
          <NavLink to="/contact" className={getNavLinkClass}>Contact</NavLink>
        </motion.li>
      </ul>
    </motion.nav>
  );
}

export default Navbar;