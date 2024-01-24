import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./BuyerInformation.css";

const BuyerInformation = () => {
  const [buyerInfo, setBuyerInfo] = useState({
    user_id: "",
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const [disabledFields, setDisabledFields] = useState({
    name: true,
    email: true,
    address: true,
    city: true,
    state: true,
    zipcode: true,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { cartId, products } = state || {};
  const [userId, setUserId] = useState(state?.userId || null); // Use state to store userId

   useEffect(() => {
      const fetchData = async () => {
        try {
        const fetchedUserId = 1; // Replace this with your logic to get the user ID
              setUserId(fetchedUserId);

              if (userId) {
                const token = localStorage.getItem('shop_access_token');
                console.log('Token:', token);

                const response = await axios.get(`http://127.0.0.1:8080/api/buyer-information/${userId}`, {
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                  }
                });
            const fetchedBuyerInfo = response.data;
            setBuyerInfo(fetchedBuyerInfo);
          }
        } catch (error) {
          console.error("Error fetching buyer information:", error);
        }
      };

      fetchData();
    }, [userId]);  // Only run the effect if userId changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuyerInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleEditClick = (field) => {
    setDisabledFields((prevDisabledFields) => ({ ...prevDisabledFields, [field]: !prevDisabledFields[field] }));
  };

  const handlePaypal = async () => {
    try {
    const fetchedUserId = 1; // Replace this with your logic to get the user ID
                  setUserId(fetchedUserId);
      if (!userId) {
        setIsLoggedIn(false);
        return;
      }
      await axios.put(`http://127.0.0.1:8080/api/buyer-information/paypal/${cartId}`, buyerInfo, userId);
      navigate("/confirmation");
    } catch (error) {
      console.error("Full error details:", error);
        navigate("/confirmation");
    }
  };

  return (
    <div className="buyer-information-container">
      <h2>Delivery/Payment Information</h2>
      {isLoggedIn ? (
        <form>
          {/* Your form content */}
        </form>
      ) : (
        <p>Please login first.</p>
      )}

      <table>
        <tbody>
          {Object.keys(disabledFields).map((field) => (
            <tr key={field}>
              <td>
                <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
              </td>
              <td>
                <input
                  type="text"
                  id={field}
                  name={field}
                  value={buyerInfo[field]}
                  onChange={handleInputChange}
                  disabled={disabledFields[field]}
                />
              </td>
              <td></td>
              <td>
                <button type="button" onClick={() => handleEditClick(field)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="paypal-button" onClick={handlePaypal}>
        PayPal
      </div>
    </div>
  );
};

export default BuyerInformation;
