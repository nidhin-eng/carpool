import React, { useEffect, useRef } from 'react';
import styles from '../pages/Landing/landing.module.css';
import Navbar from '../layouts/Navbar/Navbar';

const Why = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.section2}>
        <h2>Why Use Travel Diary?</h2>
        <div className={styles.innerLeft}>
          <h3>Share Your Journey</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum vitae lacus et tempus. Sed fringilla blandit nulla, et euismod urna accumsan id. Aenean nisi elit, pretium ac pellentesque in, interdum at urna. Nulla quam massa, accumsan ut nunc vel, commodo cursus diam. Praesent dictum nec risus at pulvinar. </p>
        </div>
        <div className={styles.innerRight}>
          <h3>Engage with Travelers</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dictum vitae lacus et tempus. Sed fringilla blandit nulla, et euismod urna accumsan id. Aenean nisi elit, pretium ac pellentesque in, interdum at urna. Nulla quam massa, accumsan ut nunc vel, commodo cursus diam. Praesent dictum nec risus at pulvinar. </p>
        </div>
      </div>
    </div>
  )
}

export default Why;