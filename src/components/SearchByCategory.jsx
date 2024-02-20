import { useState, useEffect } from "react";
import "./SearchByCategory.css";

import { Link } from "react-router-dom";

const categoriesUrl = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
export default function SearchByCategory() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(categoriesUrl);
      const { drinks } = await response.json();
      console.log("categories", drinks);
      setCategories(drinks);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const fetchProduct = async (category) => {
    console.log(category);
    try {
      const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=" + category);
      const { drinks } = await response.json();
      console.log(drinks);
      setProducts(drinks);
    } catch (error) {
      console.log("Error fetching products", error);
    }
  };
  return (
    <>
      <div className="container search-category">
        {categories.map((category) => (
          <button key={category.setCategories} className="categoryBtn" onClick={() => fetchProduct(category.strCategory)}>
            {category.strCategory}
          </button>
        ))}
      </div>
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
    </>
  );
}
