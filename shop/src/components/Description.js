import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import './Description.css';

const Description = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State for the product details
  const [product, setProduct] = useState({
    name: '',
    imageUrl: [''],
    price: 0,
    description: '',
  });

  // State for the cart items
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    console.log('Fetching data for product ID:', id);
    fetch(`http://localhost:8080/products/${id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
        }
      })
      .then(data => {
        setProduct(data);
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }, [id]);
  const handleAddToCart = () => {
    const token = localStorage.getItem('shop_access_token');
  
    const productItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    };
  
    fetch('http://localhost:8080/api/cart/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(productItem),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error adding product to cart: ${response.status} ${response.statusText}`);
        }
        return response.text();
      })
      .then(data => {
        // Check if the response body is not empty before parsing
        const jsonData = data.trim(); // Remove leading and trailing whitespaces
        if (jsonData) {
          try {
            const parsedData = JSON.parse(jsonData);
            console.log('Product added to cart database:', parsedData);
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        } else {
          console.log('Empty response from the server');
        }
      })
      .catch(error => {
        console.error('Error adding product to cart database:', error.message);
      });
  };
  
  return (
    <div className="page-container">
      <div className="description-container">
        <div className="description-content-left">
          {product.imageUrl && <img
            src={"http://localhost:8080/" + product.imageUrl}
            alt={product.name}
            className="description-image"
          />}
          <p className="description-price">Price: ${product.price}</p>
        </div>
        <div className="description-content-right">
          <h1 className="description-title">{product.name}</h1>
          <p className="description-description">{product.description}</p>
          <button className="add-to-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
          {/* Link to the Cart page */}
          <Link to="/cart">View Cart</Link>
        </div>
      </div>
    </div>
  );
};

export default Description;
