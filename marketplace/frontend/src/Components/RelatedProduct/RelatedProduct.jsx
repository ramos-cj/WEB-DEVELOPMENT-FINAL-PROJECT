import React, { useEffect, useState } from 'react'
import './RelatedProduct.css'
import { Item } from '../Item/Item'
import rectangle_icon from '../Assets/rectangle.png'
export const RelatedProduct = () => {


  const  [relatedProducts, setRelatedProducts] = useState ([]);

  useEffect(()=>{
    fetch('http://localhost:4000/relatedproducts')
    .then((response)=>response.json())
    .then((data)=>setRelatedProducts(data))
  },[])


  return (
    <div className='relatedproduct'>
        <h1>Trending Now</h1>
        <img src={rectangle_icon} alt="" />
        <div className="relatedproduct-item">
            {relatedProducts.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
        </div>

    </div>
  )
}
