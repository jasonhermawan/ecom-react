import React from 'react'
import './productDash.css'

const ProductDashCard = (props) => {
  return (
    <div id='product-dash-card'>
      <div className='product-details-content'>
        <img src={props.image} alt="" />
        <div className="detail-text">
          <h1>{props.name}</h1>
          <p>{props.price}</p>
        </div>
      </div>
      <div className='action-btn'>
        <button onClick={props.onEdit}>Edit</button>
        <button onClick={props.onDelete}>Delete</button>
      </div>
    </div>
  )
}

export default ProductDashCard