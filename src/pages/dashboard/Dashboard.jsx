import React, { useContext } from 'react';

import './dashboard.scss';
import '../../styles/layouts/items-container.scss';

import ItemCard from '../../components/itemCard/ItemCard';
import { data } from '../../../data';
import EmptyCartIcon from '../../assets/images/illustration-empty-cart.svg';
import RemoveIcon from '../../assets/images/icon-remove-item.svg';
import CarbonDeliveryIcon from '../../assets/images/icon-carbon-neutral.svg';
import { CartContext } from '../../context/CartContext';

const Dashboard = () => {
  const { cartItems, cartCount, totalPrice, deleteItemFromCart } = useContext(CartContext);
  console.log("cart Items: ", cartItems);
  return (
    <div className="dashboard">
      <main className="dashboard__main-content">
        <div className="dasboard-header">
          <h1 className="dashboard-title">Desserts</h1>
        </div>
        <div className="items-container">
          {data.map((item) => <ItemCard key={item.id} item={item} />)}
        </div>
      </main>
      <aside className="dashboard__sidebar">
        <p className="title">Your Cart({cartCount})</p>
        {!cartCount > 0 && 
          <div className="empty-cart">
            <EmptyCartIcon/>
            <p>Your added item will appear here</p>
          </div>
        }
        {cartCount > 0 && 
          <div className="cart-items">
            {cartItems && cartItems.map((cartItem, index) =>
              <div className="cart-item" key={`${cartItem.id}-${index}`}>
                <div className="item-left">
                  <p className="item-name">{cartItem?.name}</p>
                  <div className="item-states">
                    <p className="item-quantity">{cartItem?.quantity}x</p>
                    <p className="item-rate">{cartItem?.price}</p>
                    <p className="item-total">{cartItem?.price * cartItem?.quantity}</p>
                  </div>
                </div>
                <div className="item-right">
                  <div className="icon-cover">
                    <RemoveIcon onClick={() => deleteItemFromCart(cartItem)} />
                  </div>
                </div>
              </div>
            )}
            <div className="cart-total">
              <p className="total-label">Order Totel</p>
              <p className="total-price">${totalPrice}</p>
            </div>
            <div className="carbon-delivery">
              <CarbonDeliveryIcon />
              <p>This is <span>carbon-neutral</span> delivery</p>
            </div>
            <div className="confirm-button">Confirm Order</div>
          </div>
        }
      </aside>
    </div>
  );
};

export default Dashboard;
