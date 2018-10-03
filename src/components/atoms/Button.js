import React from 'react';

import styles from './Button.module.css';

export const Button = ({disabled, children}) => (
  <button className={disabled ? styles.disabled : styles.primary} disabled={disabled}>
    {children}
  </button>
);
