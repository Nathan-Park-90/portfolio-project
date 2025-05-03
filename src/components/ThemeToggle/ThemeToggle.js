import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import styles from './ThemeToggle.module.css';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <motion.button
      className={styles.themeToggle}
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <FiSun className={styles.icon} />
      ) : (
        <FiMoon className={styles.icon} />
      )}
    </motion.button>
  );
};

export default ThemeToggle; 