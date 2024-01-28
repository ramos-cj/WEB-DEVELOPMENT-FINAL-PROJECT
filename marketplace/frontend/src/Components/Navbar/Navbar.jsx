import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'

import logo from '../Assets/logo.png'
import cart from '../Assets/cart.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import hamburger_icon from '../Assets/hamburger_icon.png'

export const Navbar = () => {

    const [menu, setMenu] = useState("shop");
    const {getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef();

    const hamburger_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }
 
    return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt=""/>
            <p>CLASSIC JAM</p>
        </div>
        <img className='nav-dropdown' onClick={hamburger_toggle}src={hamburger_icon} alt="" />
        <ul ref={menuRef} className="nav-menu">
            <li onClick={()=>{setMenu("shop")}}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("guitar")}}><Link style={{ textDecoration: 'none' }} to='/guitar'>Guitar</Link>{menu==="guitar"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("accessories")}}><Link style={{ textDecoration: 'none' }} to='/accessories'>Accessories</Link>{menu==="accessories"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("amplifier")}}><Link style={{ textDecoration: 'none' }} to='/amplifier'>Amplifier</Link>{menu==="amplifier"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("effects")}}><Link style={{ textDecoration: 'none' }} to='/effects'>Effects & Pedals</Link>{menu==="effects"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-cart">
            <Link to='/cart'><img src={cart} alt="" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
          
        </div>
  )
}


