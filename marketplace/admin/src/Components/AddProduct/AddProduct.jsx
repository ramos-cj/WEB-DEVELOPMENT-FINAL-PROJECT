import React, { useState } from 'react'
import './AddProduct.css'
import upload_icon from '../../assets/upload_icon.png'
const AddProduct = () => {

    const [image,setImage] = useState(false);
    const [productDescription,setProductDescription] = useState({
        name:"",
        image:"",
        category:"guitar",
        new_price:"",
        old_price:"",
        quantity:""
    })

    const imageBox = (e) =>{
        setImage(e.target.files[0]);
    }
    const changeHandler = (e) =>{
        setProductDescription({...productDescription,[e.target.name]:e.target.value})
    }
    
    const add_product = async () => {
        console.log(productDescription);
        let responseData;
        let product = productDescription;

        let formData = new FormData();
        formData.append('product', image);

        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        })
            .then((resp) => resp.json())
            .then((data) => {
                responseData = data;
            });

        if (responseData.success) {
            product.image = responseData.image_url;
            console.log(product);
            await fetch('http://localhost:4000/addproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            })
                .then((resp) => resp.json())
                .then((data) => {
                    if (data.success) {
                        
                        // Reset both productDescription and image state
                        setProductDescription({
                            name: '',
                            image: '',
                            category: 'guitar',
                            new_price: '',
                            old_price: '',
                            quantity: '',
                        });
                        setImage(null);
                    } else {
                        alert('Failed to ADD product.');
                    }
                });
        }
    };

  return (
    <div className='addproduct'>
        <h1>ADD PRODUCTS</h1>
        <div className="addproduct-itemfield">
            <p>Product Name</p>
            <input value={productDescription.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Price</p>
                <input value={productDescription.old_price} onChange={changeHandler} type="text" name="old_price" placeholder='Type here' />
            </div>
            <div className="addproduct-itemfield">
                <p>Sale Price</p>
                <input value={productDescription.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='Type here' />
            </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Product Category</p>
            <select value={productDescription.category} onChange={changeHandler} name="category" className='addproduct-selector'>
                <option value="guitar">Guitar</option>
                <option value="accessories">Accessories</option>
                <option value="amplifier">Amplifier</option>
                <option value="effects">Effects & Pedal</option>
            </select>
        </div>
        <div className="addproduct-itemfield-quantity">
            <p>Product Quantity</p>
            <input value={productDescription.quantity} onChange={changeHandler} type="text" name="quantity" placeholder='Type here' />
        </div>
        <div className="addproduct-itemfield">
            <p>Product Image</p>
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload_icon} className='addproduct-thumbnail-img' alt="" />
            </label>
            <input onChange={imageBox} type="file" name='image' id='file-input' hidden/>
        </div>
        <button onClick={()=>{add_product()}} className='addproduct-button'>Add Product</button>
    </div>
  )
}

export default AddProduct