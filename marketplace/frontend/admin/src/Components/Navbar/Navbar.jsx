import React from 'react';
import './Navbar.css';
import nav_logo from '../../assets/nav_logo.png';
import nav_profile from '../../assets/nav_profile.jpg';
import logout_icon from '../../assets/logout_icon.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={nav_logo} alt="" />
        <p>CLASSIC JAM</p>
      </div>
      <div className="client-nav">
        <a href='http://localhost:3000' target='_blank' rel='noopener noreferrer'>
          <button>CLIENT</button>
        </a>
        </div>

        <div className="nav-profile">
        <p>ADMIN PANEL</p>


        {localStorage.getItem('auth-token') ? (
          <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/'); }}>
            <img src={logout_icon} alt="" />
          </button>
        ) : (
          <Link to={'/loginsignup-admin'} style={{ textDecoration: "none" }}>
            <button> <img src={nav_profile} alt="" /></button>
          </Link>
        )}

      </div>
    </div>
  );
}

export default Navbar;
