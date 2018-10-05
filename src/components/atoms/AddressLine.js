import React from 'react';

import styles from './AddressLine.module.css';

export const AddressLine = ({text, addMargin}) => !addMargin
  ? <p className={styles.m__0}>{text}</p>
  : <p>{text}</p>
