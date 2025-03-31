import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (game) => {
    const exists = cartItems.find(item => item.game_id === game.game_id);
    if (exists) {
      setCartItems(prev =>
        prev.map(item =>
          item.game_id === game.game_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems(prev => [...prev, { ...game, quantity: 1 }]);
    }
  };

  const removeFromCart = (game_id) => {
    setCartItems(prev => prev.filter(item => item.game_id !== game_id));
  };

  const incrementQuantity = (game_id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.game_id === game_id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (game_id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.game_id === game_id
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
