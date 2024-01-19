import React, { useState } from 'react';
import './AddEditProduct.css'; 
import Navbar from './NavBar';
const AddEditProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === 'file' ? e.target.files[0] : value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product submitted:', product);
  };

  return (
    <div>
    <div className="add-edit-product-container">
      <h1>Add/Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Image:</span>
          <input type="file" name="image" accept="image/*" onChange={handleChange} />
        </label>
        <label>
          <span>Product Name:</span>
          <input type="text" name="name" value={product.name} onChange={handleChange} />
        </label>
        <label>
          <span>Price:</span>
          <input type="text" name="price" value={product.price} onChange={handleChange} />
        </label>
        <label>
         <span>Description:</span>
          <textarea name="description" value={product.description} onChange={handleChange} />
        </label>
        <button type="submit">Save Product</button>
      </form>
    </div>
  </div>
);
};

export default AddEditProduct;
