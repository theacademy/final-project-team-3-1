import React from "react";
import "./Result.css";

const Result = ({ searchTerm, searchResults }) => {
  return (
    <div className="result-container">
      <h2>Search For "{searchTerm}"</h2>
      <div className="grid-container">
        {searchResults.map((result) => (
          <div key={result.id} className="grid-item">
            <p>{result.name}</p>
            <p>Price: {result.price}</p>
            <img
              src={result.imageUrl}  
              alt={result.name}
              style={{ width: "200px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
