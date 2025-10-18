import React, { useEffect, useRef } from 'react';
import styles from '../pages/Landing/landing.module.css';
import Navbar from '../layouts/Navbar/Navbar';
import profile from '../assets/anish.jpg';

const Reviews = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.section3}>
        <h2>See What Our Travelers Are Saying</h2>
        <div className={styles.inner_sec3}>
          {[0, 1, 2, 3].map((_, index) => (
            <div
              key={index}
              className={styles.card}
            >
              <img src={profile} alt="profile" />
              <h3>Anish Nagula</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque tempora placeat perferendis nulla veniam aliquam consequuntur animi beatae culpa laboriosam voluptate eveniet in, magnam aperiam possimus delectus quos modi. Sint!</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Reviews;