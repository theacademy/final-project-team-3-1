import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './Description.css';

const Description = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: '',
    imageUrl: [''],
    price: 0,
    description: '',
  });

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
        console.log('Fetched product data:', data);
        setProduct(data);
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }, [id]);
  const handleAddtoCart = () => {
    console.log('Add to Cart clicked');
    handleAddtoCart(product);
  }
  return (
    <div className="page-container">
      <div className="description-container">
        <div className="description-content-left">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="description-image"
          />
          <p className="description-price">Price: ${product.price}</p>
        </div>
        <div className="description-content-right">
          <h1 className="description-title">{product.name}</h1>
          <p className="description-description">{product.description}</p>
          <button className="add-to-cart" onClick={() => console.log('Add to Cart clicked')}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Description;
