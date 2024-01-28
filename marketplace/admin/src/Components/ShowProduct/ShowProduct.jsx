import React, { useEffect, useState } from 'react'
import './ShowProduct.css'
const ShowProduct = () => {

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

    return (
    <div className='showproduct'>
        <h1>ALL PRODUCTS</h1>
        <div className="showproduct-format-main">
            <p>Products</p>
            <p>Name</p>
            <p>Old Price</p>
            <p>New Price</p>
            <p>Category</p>
            <p>Quantity</p>
        </div>
        <div className="showproduct-allproducts">
            <hr />
            {allproducts.map((product,index)=>{
                return <><div key={index} className="showproduct-format-main showproduct-format">
                    <img src={product.image} alt="" className="showproduct-product-icon" />
                    <p>{product.name}</p>
                    <p>PHP {product.old_price}</p>
                    <p>PHP {product.new_price}</p>
                    <p>{product.category}</p>
                    <p>{product.quantity}</p>
                </div>
                <hr />
                </>
            })}
        </div>
    </div>
  )
}

export default ShowProduct