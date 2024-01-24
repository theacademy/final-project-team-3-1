import React from 'react';
import { Link } from 'react-router-dom';
import './Result.css';

const Result = ({ searchTerm, searchResults }) => {
  return (
    <div>
      <h2>Search Results for: {searchTerm}</h2>
      <div className="product-list">
        {searchResults.map(product => (
          <Link key={product.id} to={`/products/${product.id}`} className="product-container">
            <div>
              <Link to={`/products/${product.id}`} className="product-text">
                <img src={"http://localhost:8080/" + product.imageUrl} alt={product.name} className="product-image" />
                <h3>{product.name}</h3>
              </Link>
              <p>${product.price}</p>
              <button>Add to Cart</button>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Result;

