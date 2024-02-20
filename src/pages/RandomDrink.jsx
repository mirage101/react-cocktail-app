import React, { useEffect, useState } from "react";

export default function RandomDrink() {
  const [product, setProduct] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
      const { drinks } = await response.json();
      // Check if drinks array is not empty
      if (drinks && drinks.length > 0) {
        setProduct(drinks[0]); // Set the first item of drinks array
      }
    } catch (error) {
      console.error("Error fetching product:", error.message);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="container">
      {product && (
        <div className="drink">
          <button className="btn" onClick={fetchProduct}>
            Get Random Drink
          </button>
          <div className="flex-container">
            <img src={product.strDrinkThumb} alt="" className="cocktail-img" />
            <div className="cocktail-infos">
              <div className="row">
                <h3 className="label">Name:</h3>
                <p className="text">{product.strDrink}</p>
              </div>
              <div className="row">
                <h3 className="label">Category:</h3>
                <p className="text">{product.strCategory}</p>
              </div>
              <div className="row">
                <h3 className="label">Info:</h3>
                <p className="text">{product.strAlcoholic}</p>
              </div>
              <div className="row">
                <h3 className="label">Instructions:</h3>
                <p className="text">{product.strInstructions}</p>
              </div>
              <div className="row">
                <h3 className="label">Glass:</h3>
                <p className="text">{product.strGlass}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
