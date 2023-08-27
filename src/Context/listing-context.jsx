import React, { createContext, useState } from "react";
import list from "../data";
import list2 from "../data2";

export const ListingContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i < list.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};
const getDefaultCart2 = () => {
  let cart = {};
  for (let i = 1; i < list2.length + 1; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ListingContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [cartItems2, setCartItems2] = useState(getDefaultCart2());

  const addToCart = (itemId) => {
    if (cartItems[itemId] === 1) {
      alert("You already selected this person.");
      return;
    }

    setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
  };
  const addToCart2 = (itemId) => {
    if (cartItems2[itemId] === 1) {
      alert("you already selected this room.");
      return;
    }

    setCartItems2((prev) => ({ ...prev, [itemId]: 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const contextValue = {
    cartItems,
    cartItems2,
    addToCart,
    addToCart2,
    removeFromCart,
  };
  console.log(cartItems);
  console.log(cartItems2);

  return (
    <ListingContext.Provider value={contextValue}>
      {props.children}
    </ListingContext.Provider>
  );
};
