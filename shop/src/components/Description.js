// Description.js
import React, { useState } from 'react';
import Product from './Product';
import Navbar from './NavBar'; // Import the Navbar component
import './Description.css'; // Import the CSS file for styling
import stanleyCup from '../images/StanleyCup.png'; // Import the image
import stanleyCup2 from '../images/StanleyCup2.png';

const Description = () => {
  const [product, setProduct] = useState({
    name: 'Product Name',
    images: [stanleyCup, stanleyCup2], 
    price: 19.99,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  });

  // Description.js
  const addToCart = () => {
    // Create a CartDto object to send to the backend
    const productItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      img_url: product.images[0], // Assuming the first image is the representative one
    };

    // Make a POST request to the backend
    fetch('http://localhost:3000/api/cart/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productItem),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Product added to cart:', data);
        // You can perform additional actions if needed
      })
      .catch(error => {
        console.error('Error adding product to cart:', error);
      });
  };


  return (
    <div>
      <Product {...product} addToCart={addToCart} />
    </div>
  );
};

export default Description;
