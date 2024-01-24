import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('shop_access_token');

    fetch('http://localhost:8080/api/cart/items', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Error fetching cart items: ${response.status} ${response.statusText}`);
        }
      })
      .then(data => {
        setCartItems(data);
        // Set cartId from the fetched data
        if (data.length > 0) {
          setCartId(data[0].cartId); // Assuming cartId is present in the response
        }
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
      });
  }, []);


 // Function to remove an item from the cart
const removeFromCart = (itemId) => {
  const updatedCart = cartItems.filter((item) => item.id !== itemId);
  setCartItems(updatedCart);
};

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handleCheckout = () => {
    navigate("/buyer-information", {
      state: {
        products: cartItems,
        cartId: cartId, // Use the fetched cartId
      },
    });
  };
  return (
    <div className="cart-container">
      <h2>Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={"http://localhost:8080/" + item.imageUrl} alt={item.name} className="cart-item-img" />
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
