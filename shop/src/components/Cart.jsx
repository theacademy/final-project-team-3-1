import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);

  function fetchAllProducts() {
      const token = localStorage.getItem('shop_access_token');

      fetch('http://localhost:8080/api/cart/cart-products', {
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
  }

  useEffect(() => {
      fetchAllProducts();
  }, []);


  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.product.price, 0);
  };

  const handleCheckout = () => {
    navigate("/buyer-information", {
      state: {
        products: cartItems,
        cartId: cartId, // Use the fetched cartId
      },
    });
  };

    function handleDeleteClick(productId) {
        const isConfirmed = window.confirm("Are you sure you want to delete this product?");
        if (isConfirmed) {
            const token = localStorage.getItem('shop_access_token');

            fetch(`http://localhost:8080/api/cart/cart-products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error deleting product: ${response.status} ${response.statusText}`);
                    }
                    return response;
                })
                .then(() => {
                    fetchAllProducts(); // Fetch all products again to update the list
                })
                .catch(error => {
                    console.error('Error occurred while deleting product:', error);
                });
        }
    }


    return (
    <div className="cart-container">
      <h2>Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={"http://localhost:8080/" + item.product.imageUrl} alt={item.product.name} className="cart-item-img" />
          <div className="cart-item-details">
            <div className="cart-item-title">{item.product.name}</div>
            <div className="cart-item-actions">
              <button onClick={() => handleDeleteClick(item.id)}>Remove</button>
              Price: ${item.product.price}
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
