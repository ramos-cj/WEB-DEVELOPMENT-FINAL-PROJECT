import React, { useEffect, useState } from 'react'
import'./UpdateProduct.css'
const UpdateProduct = () => {

    const [productId, setProductId] = useState('');
    const [newName, setNewName] = useState('');
    const [newOld_price, setNewOld_price] = useState('');
    const [newNew_price, setNewNew_price] = useState('');
    const [newQuantity, setNewQuantity] = useState('');

    const handleProductIdChange = (e) => {
        setProductId(e.target.value);
    };

    const handleProductChange = (e) => {
        const { name, value } = e.target;
    
        switch (name) {
            case 'newName':
                setNewName(value);
                break;
            case 'newOld_price':
                setNewOld_price(value);
                break;
            case 'newNew_price':
                setNewNew_price(value);
                break;
            case 'newQuantity':
                setNewQuantity(value);
                break;
            default:
                break;
        }
    };
    

    const updProduct = async () => {
        try {
            if (!productId) {
                alert('Please enter a valid Product ID');
                return;
            }
    
            const response = await fetch('http://localhost:4000/updateproduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: productId,
                    name: newName,
                    old_price: newOld_price,
                    new_price: newNew_price,
                    quantity: newQuantity,
                }),
            });
    
            const data = await response.json();
    
            if (data.success) {
                alert(`The product has been updated successfully.\nNew NAME: ${data.product.name}
                    \nNew OLD PRICE: ${data.product.old_price}
                    \nNew NEW PRICE: ${data.product.new_price}
                    \nNew QUANTITY: ${data.product.quantity}`);
    
            } else {
                console.error('Failed to update the product.', data.message);
            }
        } catch (error) {
            console.error('Error updating the product.', error);
        }
    };
    
    

    

    return (
        <div className='updateproduct'>
            <h1>UPDATE PRODUCTS</h1>
            <div className="updateproduct-itemfield">
                <p>Product ID</p>
                <input type="text" value={productId} onChange={handleProductIdChange} placeholder="Enter Product ID" />
            </div>
            <div className="updateproduct-itemfield">
                <p>New Name</p>
                <input type="text" value={newName} onChange={handleProductChange}name="newName" placeholder="Enter New Name"/>
            </div>
            <div className="updateproduct-price">
            <div className="updateproduct-itemfield">
                <p>New Old Price</p>
                <input type="text" value={newOld_price} onChange={handleProductChange} name="newOld_price" placeholder="Enter New Old Price"/>
            </div>
            <div className="updateproduct-itemfield">
                <p>New Real Price</p>
                <input type="text" value={newNew_price} onChange={handleProductChange} name="newNew_price" placeholder="Enter New Real Price"/>
            </div>
            </div>
            <div className="updateproduct-itemfield">
                <p>New Quantity</p> 
                <input type="text" value={newQuantity} onChange={handleProductChange} name="newQuantity" placeholder="Enter New Quantity"/>
            </div>
            <button onClick={updProduct} className="updateproduct-button">
                Update Product
            </button>
        </div>
    );
};


export default UpdateProduct