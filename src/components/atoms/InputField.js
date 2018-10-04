import React from 'react';

import styles from './InputField.module.css';

export const InputField = ({label, handleChange, ...props}) => (
  <div>
    <label htmlFor={props.id}>{label}</label>
    <input {...props} className={styles.default} onChange={handleChange} />
  </div>
);
