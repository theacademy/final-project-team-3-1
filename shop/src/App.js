import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddEditProduct from "./components/AddEditProduct";
import BuyerInformation from "./components/BuyerInformation";
import Cart from "./components/Cart";
import Confirmation from "./components/Confirmation";
import Dashboard from "./components/Dashboard";
import Description from "./components/Description";
import Home from "./components/Home";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Product from "./components/Product";
import Result from "./components/Result";
import SignUp from "./components/SignUp";

export default function App() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    console.log('Search term:', term);
    const apiEndpoint = `http://localhost:8080/products/?search=${term}`;
    fetch(apiEndpoint)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Error fetching data: ${response.status} ${response.statusText}`);
        }
      })
      .then(data => {
        const filteredResults = data.filter(product =>
          product.name.toLowerCase().includes(term.toLowerCase())
        );
        setSearchResults(filteredResults);
      })
      .catch(error => {
        console.error('Error occurred while fetching data:', error);
      });
  };

  return (
    <>
      <Router>
        <NavBar onSearch={handleSearch} />
        <Routes>   
          <Route path="/results" element={<Result searchTerm={searchTerm} searchResults={searchResults} />} />
          <Route exact path= "/" element={<Home onSearch={handleSearch} />} />
        <Route exact path= "/cart" element={<Cart cart={cart} setCart={setCart}/>} />
        <Route exact path= "/confirmation" element={<Confirmation/>} />
        <Route exact path= "/Login" element={<Login/>} />
        <Route exact path= "/sign-up" element={<SignUp/>} />
        <Route exact path= "/product" element={<Product setCart={setCart} prev={cart}/>} />
        <Route path="/products/:id" element={<Description />} />
        <Route exact path= "/buyer-information" element={<BuyerInformation/>} />
        <Route exact path= "/add-edit-product/:id" element={<AddEditProduct/>} />
        <Route exact path= "/add-edit-product/" element={<AddEditProduct/>} />
        <Route exact path= "/dashboard" element={<Dashboard/>} />
      </Routes>
      </Router>
    </>
  );
}
