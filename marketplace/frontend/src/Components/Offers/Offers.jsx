import React from 'react'
import './Offers.css'
import { Link } from 'react-router-dom'
import exclusive_image from '../Assets/exclusive_image.png'
export const Offers = () => {
  return (
    <div className='offers'>
        <div className="offers-left">
            <img src={exclusive_image} alt="" />
    
        </div>
        <div className="offers-right">
        <h1>WHAT'S NEW</h1>
            <h1>Limited-time specials</h1>
            <p>PRODUCTS THAT ARE MADE JUST FOR YOU</p>
            <Link to='/accessories'><button>Check Now</button></Link>
        </div>
    </div>
  )
}
