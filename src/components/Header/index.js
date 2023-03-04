import React from 'react';
import { Link } from 'react-router-dom';

// styles
import styles from './Header.module.css';

export const Header = () => {
  
  return (
    <div className={styles.container}>
        <Link className={styles.link} to="/">Home</Link>
        <Link className={styles.link} to="/graphs">Graphs</Link>
        <Link className={styles.link} to="/reports">Reports</Link>
    </div>
  );
}