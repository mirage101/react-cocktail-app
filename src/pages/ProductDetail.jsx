import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";

export default function ProductDetail() {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";
  const [product, setProduct] = useState([]);
  const { drinkId } = useParams();
  console.log(drinkId);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(url + drinkId);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const { drinks } = await response.json();
        console.log(drinks);

        if (drinks && drinks.length > 0) {
          setProduct(drinks[0]);
        } else {
          // Handle case when no product is found
          console.error("Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error.message);
      }
    };

    fetchProduct();
    console.log(product);
  }, [drinkId]);

  return (
    <div className="container">
      <div className="drink">
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
    </div>
  );
}
