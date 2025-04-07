import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (game) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.game_id === game.game_id);
  
      if (existingItem) {
        if (existingItem.quantity >= game.stock) {
          alert("You have reached the stock limit for this game.");
          return prevItems; // mantém o carrinho sem alteração
        }
  
        return prevItems.map(item =>
          item.game_id === game.game_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...game, quantity: 1 }];
      }
    });
  };  

  const removeFromCart = (game_id) => {
    setCartItems(prev => prev.filter(item => item.game_id !== game_id));
  };

  const incrementQuantity = (game_id) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.game_id === game_id) {
          if (item.quantity >= item.stock) {
            alert("You have reached the stock limit for this game.");
            return item;
          }
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
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
