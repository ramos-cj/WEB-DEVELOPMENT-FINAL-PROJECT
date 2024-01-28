import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';

export const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-image-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="productdisplay-image">
                <img className='productdisplay-main-image' src={product.image} alt="" />
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-star">
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull_icon} alt="" />
                <div className="p">
                <p>(123)</p>
                </div>
            </div>
            <div className="productdiplay-right-prices">
                <div className="productdiplay-right-old-price">PHP {product.old_price}</div>
                <div className="productdiplay-right-new-price">PHP {product.new_price}</div>
            </div>
            <div className="productdisplay-right-description">
            Explore our curated collection, harmonizing the finest guitars, stylish accessories, powerful amplifiers, and groundbreaking effects pedals—all at your fingertips. Immerse yourself in a seamless shopping experience as you discover precision-crafted guitars that resonate with craftsmanship and passion
            </div>
            <div className="productdiplay-right-prices">
                <div className="productdiplay-quantity">Quantity: {product.quantity}</div>
            </div>
            <button onClick={() =>{addToCart(product.id)}}>ADD TO CART</button>
            <p className='productdisplay-right-category'> <span>Type::<span> Instruments, Music, Jamming</span></span></p>
            <p className='productdisplay-right-category'> <span>Category:<span> {product.category}</span></span></p>
        </div>
    </div>
  )
}
