import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ConfirmationDialog.module.css';

const ConfirmationDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="dialogOverlay"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="dialogContent"
          >
            <h2 className="dialogTitle">{title}</h2>
            <p className="dialogMessage">{message}</p>
            <div className="dialogActions">
              <button
                className="cancelButton"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="confirmButton"
                onClick={onConfirm}
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationDialog; 