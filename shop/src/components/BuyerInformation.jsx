// BuyerInformation.jsx

import React, { useState } from "react";
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuyerInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
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

      <div className="paypal-button">PayPal</div>
    </div>
  );
};

export default BuyerInformation;
