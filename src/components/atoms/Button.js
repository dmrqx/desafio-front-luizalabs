import React from 'react';

import styles from './Button.module.css';

export const Button = ({disabled, children}) => (
  <button className={styles.primary} disabled={disabled}>
    {children}
  </button>
);
