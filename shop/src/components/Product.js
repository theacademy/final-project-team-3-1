import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; 

const Product = ({ name, images, price, description, addToCart, onBack }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      <a className = "back-button" >back</a>
      <div className="product-container">
        <img src={images[currentImageIndex]} alt={name} className="product-image" />
        <div className="product-content">
          <h1 className="product-title">{name}</h1>
          <p className="product-description">{description}</p>
          <p className="product-price">Price: ${price}</p>
          <button className="add-to-cart" onClick={addToCart}>
            Add to Cart
          </button>
          <div className="image-navigation">
            <button className="arrow-button" onClick={previousImage}>
              <FaArrowLeft />
            </button>
            <button className="arrow-button" onClick={nextImage}>
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
