import React, { useState } from "react";
import "./Result.css";

const Result = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const productData = [
    {
      id: 1,
      name: "Untitled",
      price: 600,
      img_url:
        "https://cdn.dribbble.com/userupload/10564178/file/original-1344b65403b6787b07998a9fe93cc577.jpg?resize=512x384",
    },
    {
      id: 2,
      name: "Sanborn Avenue",
      price: 1100,
      img_url:
        "https://cdn.dribbble.com/users/648290/screenshots/6161272/media/385e000b8732228c7844a119de9ae3a6.jpg?resize=512x354",
    },
    {
      id: 3,
      name: "South Africa",
      price: 2250,
      img_url:
        "https://cdn.dribbble.com/users/59947/screenshots/3479596/dribbb.jpg?resize=512x284",
    },
    {
      id: 4,
      name: "Ash Cave",
      price: 600,
      img_url:
        "https://cdn.dribbble.com/userupload/3266648/file/original-b12e684944557e005eb351e3ba59e06e.jpg?resize=752x",
    },
    {
      id: 5,
      name: "Ash Cave",
      price: 600,
      img_url:
        "https://cdn.dribbble.com/userupload/3266648/file/original-b12e684944557e005eb351e3ba59e06e.jpg?resize=752x",
    },
  ];

  // Function to update search results
  const performSearch = (term) => {
    // Perform search logic and update searchResults
    const results = productData.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchResults(results);
    setSearchTerm(term);
  };

  // Set initial state with all products
  useState(() => {
    setSearchResults(productData);
  }, [productData]);

  return (
    <div className="result-container">
      <h2>Search For "{searchTerm}"</h2>
      <div className="grid-container">
        {searchResults.map((result) => (
          <div key={result.id} className="grid-item">
            {/* Render each search result item */}
            <p>{result.name}</p>
            <p>Price: {result.price}</p>
            <img
              src={result.img_url}
              alt={result.name}
              style={{ width: "200px" }}
            />
            {/* Add other details you want to display */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
