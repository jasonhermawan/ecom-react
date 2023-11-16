import React from 'react'
import './storeCard.css'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'

const StoreCard = (props) => {
  return (
    <div id='store-card'>
      <div className="top-store-card">
        <Avatar size="lg" src='https://bit.ly/broken-link' />
        <h2>{props.name}</h2>
        <p>10 Products</p>
      </div>
      <div className="bottom-store-card">
        <button onClick={props.onclick}>Stalk now</button>
      </div>
    </div>
  )
}

export default StoreCard