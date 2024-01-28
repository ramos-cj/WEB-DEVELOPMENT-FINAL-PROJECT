import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
export const Header = () => {
  return (
    <div className='header'>
        <ul className="header-links">
            <li>About</li>
            <li>Brands</li>
            <li>New Arrivals</li>
            <li>Special Deals</li>
            <li>Newsletter</li>
            <li>Terms & Conditions</li>
        </ul>

    <div className="header-login">
    <a href='http://localhost:5173/' target='_blank' rel='noopener noreferrer'>
            <button>ADMIN</button>
          </a>
      {localStorage.getItem('auth-token')
      ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
    :<Link to='/login'><button>Login</button></Link>}
    

    </div>
    </div>
  )
}
