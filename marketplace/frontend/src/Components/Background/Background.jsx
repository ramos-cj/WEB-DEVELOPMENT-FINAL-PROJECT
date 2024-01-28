import React from 'react'
import './Background.css'
import { Link } from 'react-router-dom'
import arrow_icon from '../Assets/arrow.png'
import back_button from '../Assets/back_button.png'

export const Background = (props) => {
    const {product} = props;
  return (
    <div className='background'>
      <h1>SHOP at Classic Jam</h1>
      <hr />
      <div className="background-top">
      <Link to='/'><img src={back_button} alt="" /></Link>HOME <img src={arrow_icon} alt="" /> SHOP <img src={arrow_icon} alt="" /> {product.category} <img src={arrow_icon} alt="" /> {product.name}

      </div>

    </div>
  )
}
