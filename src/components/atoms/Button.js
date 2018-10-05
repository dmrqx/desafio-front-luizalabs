import React from 'react';

import styles from './Button.module.css';

export const Button = ({children, disabled, handleClick, variant = 'primary'}) => (
  <button
    className={disabled ? styles.disabled : styles[variant]}
    onClick={handleClick}
  >
    {children}
  </button>
);
