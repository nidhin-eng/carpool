import React, { useEffect, useRef } from 'react';
import styles from './landing.module.css';
import Navbar from '../../layouts/Navbar/Navbar';

const Landing = () => {
  
  return (
    <div>
      <div className={styles.mainContainer}>
        <Navbar />
        <div className={styles.section1}>
          <h1>Travel</h1>
          <h3>The one place for all you’re journey stories</h3>
          <hr />
          <h1>Diary</h1>
        </div>
      </div>
    </div>
  );
};

export default Landing;
