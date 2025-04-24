import React from 'react';
import PropTypes from 'prop-types'; // Import
import styles from './Button.module.css';

function Button({ children, onClick, type = 'button', disabled = false, className = '' }) {
  // Combine local styles with any passed className
  const combinedClassName = `${styles.button} ${className}`.trim();
  return (
    <button
      className={combinedClassName}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children} {/* Use children instead of text */}
    </button>
  );
}

// Define PropTypes
Button.propTypes = {
  children: PropTypes.node.isRequired, // Use children for flexibility
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  className: PropTypes.string, // Allow passing custom classes
};

// Set default props (optional if using default parameters)
Button.defaultProps = {
  onClick: () => {}, // Default empty function for optional onClick
  type: 'button',
  disabled: false,
  className: '',
};

export default Button;