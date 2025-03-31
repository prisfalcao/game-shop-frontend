import React from "react";
import { useCart } from "../context/CartContext";
import "./Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart, incrementQuantity, decrementQuantity } =
    useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={`${item.game_id}-${index}`} className="cart-item">
              <div className="cart-details">
                <strong>{item.name}</strong> — ${item.price.toFixed(2)} <br />
                Qty: {item.quantity}
              </div>
              <div className="cart-actions">
                <button className="cart-btn decrement" onClick={() => decrementQuantity(item.game_id)}>-</button>
                <span className="item-quantity">{item.quantity}</span>
                <button className="cart-btn increment" onClick={() => incrementQuantity(item.game_id)}>+</button>
                <button className="cart-btn remove" onClick={() => removeFromCart(item.game_id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <>
          <div className="cart-total">
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>
          <button className="cart-btn checkout" onClick={() => alert('Purchase complete!')}>Finalize Purchase</button>
        </>
      )}
    </div>
  );
};

export default Cart;
