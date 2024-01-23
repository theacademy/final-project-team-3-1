import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Product = ({ id, addToCart, onBack }) => {
  const [product, setProduct] = useState({
    name: '',
    images: [],
    price: 0,
    description: '',
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
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

  return (
    <div>
      <a className="back-button" onClick={onBack}>
        back
      </a>
      <div className="product-container">
        <img src={product.images[currentImageIndex]} alt={product.name} className="product-image" />
        <div className="product-content">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <p className="product-price">Price: ${product.price}</p>
          <button className="add-to-cart" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
          <div className="image-navigation">
            {/* <button className="arrow-button" onClick={previousImage}>
              <FaArrowLeft />
            </button>
            <button className="arrow-button" onClick={nextImage}>
              <FaArrowRight />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
