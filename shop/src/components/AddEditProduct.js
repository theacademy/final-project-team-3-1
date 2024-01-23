import React, {useEffect, useState} from 'react';
import './AddEditProduct.css';
import {useNavigate, useParams} from "react-router-dom";

const AddEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
    imageUrl: ''
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === 'file' ? e.target.files[0] : value,
    }));
  };

  const createProduct = async () => {
    const token = localStorage.getItem('shop_access_token');
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('description', product.description);
    if (product.image) {
      formData.append('image', product.image);
    }

    try {
      const response = await fetch('http://localhost:8080/products/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Error creating product');

      const newProduct = await response.json();
      setProduct(newProduct);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product');
    }
  };

  const updateProduct = async () => {
    const token = localStorage.getItem('shop_access_token');
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('description', product.description);
    if (product.image) {
      formData.append('image', product.image);
    }

    try {
      const response = await fetch(`http://localhost:8080/products/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
          // Notice: 'Content-Type' header is not set here
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Error updating product');

      const updatedProduct = await response.json();
      setProduct(updatedProduct);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      await updateProduct();
    } else {
      await createProduct();
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct({
          ...data,
          description: data.description || ''
        });
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (id) fetchProduct();
  }, [id]); // Dependency array ensures this effect runs when `id` changes

  return (
    <div>
    <div className="add-edit-product-container">
      <h1>{id ? "Edit Product" : "Add Product"}</h1>
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
