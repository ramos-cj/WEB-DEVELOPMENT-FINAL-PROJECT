import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Routes,Route } from 'react-router-dom'
import AddProduct from '../../Components/AddProduct/AddProduct'
import UpdateProduct from '../../Components/UpdateProduct/UpdateProduct'
import DeleteProduct from '../../Components/DeleteProduct/DeleteProduct'
import ShowProduct from '../../Components/ShowProduct/ShowProduct'
import LoginSignupAdmin from '../../Components/LoginSignupAdmin/LoginSignupAdmin'
import ShowUsers from '../../Components/ShowUsers/ShowUsers'
const Admin = () => {
  return (
    <div className='admin'>
        <Sidebar/>
        <Routes>
        <Route path='/allusers' element={<ShowUsers/>}/>
          <Route path='/addproduct' element={<AddProduct/>}/>
          <Route path='/updateproduct' element={<UpdateProduct/>}/>
          <Route path='/deleteproduct' element={<DeleteProduct/>}/>
          <Route path='/allproducts' element={<ShowProduct/>}/>
          <Route path='/loginsignup-admin' element={<LoginSignupAdmin/>}/>
        </Routes>
    </div>
  )
}

export default Admin