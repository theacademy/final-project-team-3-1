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

  const addToCart = () => {
    console.log('Product added to cart:', product);
  };

  return (
    <div>
      <Navbar /> 
      <Product {...product} addToCart={addToCart} />
    </div>
  );
};

export default Description;
