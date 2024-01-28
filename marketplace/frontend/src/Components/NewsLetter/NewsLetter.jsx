import React from 'react'
import './NewsLetter.css'
import { Link } from 'react-router-dom'
export const NewsLetter = () => {
  return (
    <div className='newsletter'>
        <h1>Gain Access To Special Deals</h1>
        <p>Stay in the loop with our newsletter and get the latest news in your inbox</p>
        <div className="newsletter-button">
            <input type="email" placeholder='Your E-mail ID' />
            <Link  style={{ textDecoration: 'none' }} to='/login'><button >Subscribe Now </button></Link>
        </div>

    </div>
  )
}
