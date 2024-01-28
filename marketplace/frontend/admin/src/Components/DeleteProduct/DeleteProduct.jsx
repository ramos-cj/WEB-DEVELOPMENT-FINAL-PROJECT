import React, { useEffect, useState } from 'react'
import './DeleteProduct.css'
import remove_icon from '../../assets/remove_icon.png'
const DeleteProduct = () => {
    const [allproducts,setAllproducts] = useState([]);


    const fetchInfo = async () => {
        try {
            const response = await fetch('http://localhost:4000/allproducts');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setAllproducts(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    
    useEffect(()=>{
        fetchInfo();
    },[])

    const removeProduct = async (id) => {
        try {
            await fetch('http://localhost:4000/deleteproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id })
            });
    
            window.alert('The product has been successfully DELETED.');
            await fetchInfo();
        } catch (error) {
            console.error('Error DELETING product:', error);
            window.alert('Failed to DELETE product.');
        }
    };


    return (
    <div className='deleteproduct'>
        <h1>DELETE PRODUCTS</h1>
        <div className="deleteproduct-format-main">
            <p>Products</p>
            <p>Name</p>
            <p>Old Price</p>
            <p>New Price</p>
            <p>Category</p>
            <p>Quantity</p>
            <p>Remove</p>
        </div>
        <div className="deleteproduct-allproducts">
            <hr />
            {allproducts.map((product,index)=>{
                return <><div key={index} className="deleteproduct-format-main deleteproduct-format">
                    <img src={product.image} alt="" className="deleteproduct-product-icon" />
                    <p>{product.name}</p>
                    <p>PHP {product.old_price}</p>
                    <p>PHP {product.new_price}</p>
                    <p>{product.category}</p>
                    <p>{product.quantity}</p>
                    <img onClick={()=>{removeProduct(product.id)}} className="deleteproduct-remove-icon" src={remove_icon} alt="" />
                </div>
                <hr />
                </>
            })}
        </div>
    </div>
  )
}

export default DeleteProduct