import React from 'react';
import styles from './Button.module.css';

function Button({ text, onClick, type = 'button', disabled = false }) {
  return (
    <button className={styles.button} onClick={onClick} type={type} disabled={disabled}>
      {text}
    </button>
  );
}

export default Button;