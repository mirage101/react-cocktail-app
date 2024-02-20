import { useEffect, useState } from "react";
import "./Drinks.css";
import { Link } from "react-router-dom";
export default function Drinks() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=");
      const drinks = await response.json();

      setProducts(drinks.drinks); // Assuming drinks.drinks contains the array of drinks
      console.log(drinks.drinks);
    };
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <div className="cocktails-container">
        {products.map((product) => (
          <div className="cocktail-card" key={product.id}>
            <img alt="" src={product.strDrinkThumb} className="cocktail-imh" />
            <div className="cocktail-info">
              <div className="cocktail-text">
                <div className="cocktail-name">{product.strDrink}</div>
                <span className="cocktail-info">{product.strCategory}</span>
                <Link to={`/drink/${product.idDrink}`}>
                  <div className="btn">View Details</div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
