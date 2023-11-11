import React from 'react'
import './productCard.css'

const ProductCard = (props) => {
  return (
    <div className='product-card' onClick={props.onClick}>
      <div className='product-img'>
        <img src={props.image} alt="" />
      </div>
      <div className="product-details">
        <p className='product-name'>{props.name}</p>
        <h3 className='product-price'>Rp. {props.price}</h3>
        <p className='store-name'>{props.storename}</p>
        <div className="product-stats">
          <div className="rating">
            <i className='bx bxs-star'></i>
            <p>4.9</p>
          </div>
          <div className="sold">
            <p>18 sold</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard