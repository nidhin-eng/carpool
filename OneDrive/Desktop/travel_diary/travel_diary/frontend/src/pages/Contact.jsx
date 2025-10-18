import React, { useEffect, useRef } from 'react';
import styles from '../pages/Landing/landing.module.css';
import Navbar from '../layouts/Navbar/Navbar';

const Contact = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.footer}>
        <h4>Created-By: </h4>
        <ul>
          <li>{`~>`} Nagula Anish</li>
          <li>{`~>`} Naman Nagar</li>
          <li>{`~>`} Nidhi N</li>
        </ul>
        <h4>contact us at: 7075773848</h4>
      </div>
    </div>
  )
}

export default Contact;