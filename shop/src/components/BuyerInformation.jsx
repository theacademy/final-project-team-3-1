// BuyerInformation.jsx

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios"; // Add this line
import "./BuyerInformation.css";

const BuyerInformation = () => {
  const [buyerInfo, setBuyerInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });
   const navigate = useNavigate();
     const location = useLocation();
     const { state } = location;
     const { cartId, products } = state || {};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuyerInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

const handlePaypal = async () => {
  try {
    // Send a request to the server to update cart status and save buyer information
    await axios.put(`/api/buyer-information/paypal/${cartId}`, buyerInfo);

    // After successful checkout, redirect to a confirmation page
    navigate("/checkout-confirmation");
  } catch (error) {
    // Handle errors
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Server responded with an error status:", error.response.status);
      console.error("Error details:", error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received from the server.");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request:", error.message);
    }

    console.error("Full error details:", error);
  }
};

  return (
    <div className="buyer-information-container">
      <h2>Delivery/Payment Information</h2>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={buyerInfo.name}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={buyerInfo.email}
          onChange={handleInputChange}
        />

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={buyerInfo.address}
          onChange={handleInputChange}
        />

        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={buyerInfo.city}
          onChange={handleInputChange}
        />

        <label htmlFor="state">State:</label>
        <input
          type="text"
          id="state"
          name="state"
          value={buyerInfo.state}
          onChange={handleInputChange}
        />

        <label htmlFor="zipcode">Zipcode:</label>
        <input
          type="text"
          id="zipcode"
          name="zipcode"
          value={buyerInfo.zipcode}
          onChange={handleInputChange}
        />
      </form>

      <div className="paypal-button" onClick={handlePaypal}>
              PayPal
            </div>
    </div>
  );
};

export default BuyerInformation;
