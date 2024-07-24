import React, { useContext, useState } from 'react';

import './item-card.scss';
import item from '../../assets/images/image-baklava-desktop.jpg';
import DecrementIcon from '../../assets/images/icon-decrement-quantity.svg';
import IncrementIcon from '../../assets/images/icon-increment-quantity.svg';
import AddToCartIcon from '../../assets/images/icon-add-to-cart.svg';
import { CartContext } from '../../context/CartContext';

const ItemCard = ({ item }) => {
  const { addItemToCart, removeItemFromCart } = useContext(CartContext);
  const { id, image, name, category, price } = item ?? {};
  const [itemCount, setItemCount] = useState(0);
  const handleIncrement = () => {
    setItemCount(prev => prev + 1);
    addItemToCart(item);
  };
  const handleDecrement = () => {
    setItemCount(prev => prev - 1);
    removeItemFromCart(item);
  };

  return (
    <div className="item-card">
      <div className="item-image">
        <img src={`${image.desktop}`} alt={name} />
        {
          itemCount < 1 ?
          <div className="add-to-cart" onClick={handleIncrement}>
            <AddToCartIcon />
            <p>Add to Cart</p>
          </div> :
          <div className="item-card-counter">
            <div className="decrement" onClick={handleDecrement}>
              <DecrementIcon className='inc-dec' />
            </div>
            <p className="count">{itemCount}</p>
            <div className='increment' onClick={handleIncrement}>
              <IncrementIcon className="inc-dec" />
            </div>
          </div>
        }
      </div>
      <div className="item-details">
        <p className="item-category">{category}</p>
        <p className="item-name">{name}</p>
        <p className="item-price">${price}</p>
      </div>
    </div>
  );
};

export default ItemCard;
