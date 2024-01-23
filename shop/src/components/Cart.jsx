import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 20,
      img_url:
        "https://cdn.dribbble.com/userupload/10564178/file/original-1344b65403b6787b07998a9fe93cc577.jpg?resize=512x384",
    },
    {
      id: 2,
      name: "Product 2",
      price: 30,
      img_url:
        "https://cdn.dribbble.com/users/648290/screenshots/6161272/media/385e000b8732228c7844a119de9ae3a6.jpg?resize=512x354",
    },
  ]);

  // Function to remove an item from the cart
  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  // Function to calculate the total price
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handleCheckout = () => {
    // Pass the list of products and cart ID to BuyerInformation
    navigate("/buyer-information", {
      state: {
        products: cartItems,
        cartId: 1, // Replace with your actual cart ID
      },
    });
  };

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.img_url} alt={item.name} className="cart-item-img" />
          <div className="cart-item-details">
            <div className="cart-item-title">{item.name}</div>
            <div className="cart-item-actions">
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
              Price: ${item.price}
            </div>
          </div>
        </div>
      ))}
      <div className="cart-total">
        <p>Total Price: ${calculateTotalPrice()}</p>
      </div>
      <button className="checkout-btn" onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};

export default Cart;
