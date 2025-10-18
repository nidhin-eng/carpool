import React from 'react';
import styles from './sidebar.module.css';

const Sidebar = ({user}) => {
  return (
    <aside className={styles.sidebarLeft}>
      <div className={styles.profileSummary}>
        <h3>{user?.username || 'Guest'}</h3>
        <p>Computer Science Student</p>
        <p className={styles.profileCollege}>PES University, Bangalore</p>
      </div>

      <div className={styles.suggestions_container}>
        <div className={styles.suggestions}>
          <h3>Top International Travel Destinations</h3>
          <ul>
            <li>Paris</li>
            <li>Rome</li>
            <li>Maui</li>
            <li>Maldives</li>
            <li>Tokyo</li>
          </ul>
        </div>
        <div className={styles.suggestions}>
          <h3>Top Places to Visit in India</h3>
          <ul>
            <li>Hyderabad</li>
            <li>Ooty</li>
            <li>Pondicherry</li>
            <li>Shimla</li>
            <li>Kerala</li>
          </ul>
        </div>
      </div>
      
    </aside>
  );
};

export default Sidebar;