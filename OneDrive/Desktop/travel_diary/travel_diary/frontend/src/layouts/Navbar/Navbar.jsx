import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import logo from '../../assets/icon/backpack-stroke-rounded.svg'

const Navbar = () => {
  return (
    <div className={styles.mainContainer}>
      <Link to="/landing"><img className={styles.logo} src={logo} alt="Logo" /></Link>
      <div className={styles.rightsection}>
        <ul>
          <li><Link to="/why">Why Us</Link></li>
          <li><Link to="/reviews">Reviews</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
        </ul>
        <button><Link to="/login" >Login</Link></button>
        <button><Link to="/signup" >Sign Up</Link></button>
      </div>
    </div>
  )
}

export default Navbar;
