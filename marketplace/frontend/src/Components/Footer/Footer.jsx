import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo_footer.png'
import ig_icon from '../Assets/ig_icon.png'
import fb_icon from '../Assets/fb_icon.png'
import twitter_icon from '../Assets/twitter_icon.png'
import pinterest_icon from '../Assets/pinterest_icon.png'
export const Footer = () => {
  return (
    <div className='footer'>
        <ul className="footer-links">
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-social-links">
            <div className="footer-links-container">
                <img src={ig_icon} alt="" />
            </div>
            <div className="footer-links-container">
            <img src={fb_icon} alt="" />
            </div>
            <div className="footer-links-container">
            <img src={twitter_icon} alt="" />
            </div>
            <div className="footer-links-container">
            <img src={pinterest_icon} alt="" />
            </div>
        </div>
        <div className="footer-logo">
            <img src={footer_logo} alt="" />
            <p>CLASSIC JAM</p>
        </div>
        <div className="footer-copyright">
            <hr />
        </div>
    </div>
  )
}
