import React from "react";
import {useState} from 'react'
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Switch} from 'react-router-dom';
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

export default function App(){
 
  const [cart, setCart] = useState([
    ]);
 
  return(
   <>   
    <NavBar/>
    <Router>
      <Routes>
        <Route exact path= "/" element={<Home />} />
        <Route exact path= "/results" element={<Result />} />
        <Route exact path= "/cart" element={<Cart cart={cart} setCart={setCart}/>} />
        <Route exact path= "/confirmation" element={<Confirmation/>} />
        <Route exact path= "/Login" element={<Login/>} />
        <Route exact path= "/sign-up" element={<SignUp/>} />
        <Route exact path= "/product" element={<Product setCart={setCart} prev={cart}/>} />
        <Route exact path= "/description" element={<Description/>} />
        <Route exact path= "/buyer-information" element={<BuyerInformation/>} />
        <Route exact path= "/add-edit-product" element={<AddEditProduct/>} />
        <Route exact path= "/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
    </>
  )
}
