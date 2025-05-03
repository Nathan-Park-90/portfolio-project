import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification } from '../../context/NotificationContext';
import './Notification.module.css';

const Notification = () => {
  const { notification, hideNotification } = useNotification();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        hideNotification();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notification, hideNotification]);

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`notification ${notification.type}`}
        >
          <div className="notificationContent">
            <span className="message">{notification.message}</span>
            <button
              className="closeButton"
              onClick={hideNotification}
              aria-label="Close notification"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Notification; 