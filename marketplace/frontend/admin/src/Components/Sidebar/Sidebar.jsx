import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import add_product_icon from '../../assets/add_product_icon.png'
import update_product_icon from '../../assets/update_icon.png'
import show_product_icon from '../../assets/show_product_icon.png'
import delete_product_icon from '../../assets/delete_icon.png'
import showusers_icon from '../../assets/showusers_icon.png'
import ShowUsers from '../ShowUsers/ShowUsers'
const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/allusers'} style={{textDecoration: "none"}}>
            <div className="sidebar-item-showusers">
                <img src={showusers_icon} alt="" />
                <p>Show Users</p>
            </div>
        </Link>
        <Link to={'/addproduct'} style={{textDecoration: "none"}}>
            <div className="sidebar-item-add">
                <img src={add_product_icon} alt="" />
                <p>Add Products</p>
            </div>
        </Link>
        <Link to={'/updateproduct'} style={{textDecoration: "none"}}>
            <div className="sidebar-item-update">
                <img src={update_product_icon} alt="" />
                <p>Update Products</p>
            </div>
        </Link>
        <Link to={'/deleteproduct'} style={{textDecoration: "none"}}>
            <div className="sidebar-item-delete">
                <img src={delete_product_icon} alt="" />
                <p>Delete Products</p>
            </div>
        </Link>
        <Link to={'/allproducts'} style={{textDecoration: "none"}}>
            <div className="sidebar-item-show">
                <img src={show_product_icon} alt="" />
                <p>Show Products</p>
            </div>
        </Link>
    </div>
    
  )
}

export default Sidebar