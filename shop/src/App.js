// App.js
import React from "react";
import Result from "./components/Result"; // Adjust the path based on your project structure
import "./components/Result.css";
import Cart from "./components/Cart";
import BuyerInformation from "./components/BuyerInformation";

function App() {
  return (
    <div>
      <h1>Your React App</h1>
      {/* Other components or content */}
      <Result />
      <Cart />
      <BuyerInformation />
    </div>
  );
}

export default App;
