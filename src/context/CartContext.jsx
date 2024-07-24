import { createContext, useReducer } from "react";

import { CART_ACTION_TYPES } from "./cartActionTypes";
import { createAction } from "./createAction";

export const CartContext = createContext({
  cartCount: 0,
  totalPrice: 0,
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  deleteItemFromCart: () => {}
});

const INITIAL_STATE = {
  cartCount: 0,
  totalPrice: 0,
  cartItems: [],
};

const addItem = (cartItems, itemToAdd) => {
  const item = cartItems.find(cartItem => cartItem.id === itemToAdd.id);

  if(item) {
    return cartItems.map((cartItem) => 
      cartItem.id === itemToAdd.id ? 
        {...cartItem, quantity: cartItem.quantity + 1} :
        cartItem
    )
  }
  return [...cartItems, { ...itemToAdd, quantity: 1 }];
}

const removeItem = (cartItems, itemToRemove) => {
  const item = cartItems.find(cartItem => cartItem.id === itemToRemove.id);

  if(!item) {
    return cartItems;
  }
  if(item.quantity < 2) {
    return cartItems.filter(cartItem => cartItem.id !== item.id);
  }
  return cartItems.map((cartItem) => 
    cartItem.id === itemToRemove.id ?
      {...cartItem, quantity: cartItem.quantity - 1} : 
      cartItem
  );
}

const deleteItem = (cartItems, itemToDelete) => {
  return cartItems.filter((cartItem) => cartItem.id !== itemToDelete.id);
}

const updateCartCount = (newCartItems) => {
  return newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
}

const updateCartTotal = (newCartItems) => {
  return newCartItems.reduce((total, cartItem) => total += (cartItem.price * cartItem.quantity), 0);
}

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch(type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      };
    default:
      throw new Error(`Unhandled type of ${type} in cart reducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [{ cartCount, totalPrice, cartItems }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const updateCartReducer = (newCartItems) => {
    const newCartCount = updateCartCount(newCartItems);
    const newCartTotal = updateCartTotal(newCartItems);
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
      cartCount: newCartCount,
      totalPrice: newCartTotal,
      cartItems: newCartItems
    }));
  }

  const addItemToCart = (itemToAdd) => {
    const newCartItems =  addItem(cartItems, itemToAdd);
    updateCartReducer(newCartItems);
  }

  const removeItemFromCart = (itemToRemove) => {
    const newCartItems = removeItem(cartItems, itemToRemove);
    updateCartReducer(newCartItems);
  }

  const deleteItemFromCart = (itemToDelete) => {
    const newCartItems = deleteItem(cartItems, itemToDelete);
    updateCartReducer(newCartItems);
  }

  const value = {
    cartItems,
    cartCount,
    totalPrice,
    addItemToCart,
    removeItemFromCart,
    deleteItemFromCart
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};