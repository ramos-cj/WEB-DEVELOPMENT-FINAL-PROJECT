import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import hero_image from '../Assets/hero_image.png'
import arrow_icon from '../Assets/arrow.png'
import { Link } from 'react-router-dom'
export const Hero = () => {
  return (
    <div className='hero'>
        <div className="hero-left">
            <h2>!!!! NEW ARRIVALS !!!!</h2>
            <div>
                <div className="hero-hand-icon">
                    <p>New</p>
                    <img src={hand_icon} alt="" />
                </div>
                <p>Guitars</p>
                <p>Specially</p>
                <p>For You</p>
            </div>
            <div className="hero-latest-btn">
                <Link  style={{ textDecoration: 'none' }} to='/guitar'><button>SHOP NOW <img src={arrow_icon} alt="" /></button></Link>
                
            </div>
        </div>
        <div className="hero-right">
            <img src={hero_image} alt="" />
        </div>
    </div>
  )
}
