import { useState, useEffect } from 'react';
import './SearchByCategory.css';

import { Link } from 'react-router-dom';

const categoriesUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const ingredientsUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
const alchNonAlchUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list';
const glassesUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list';
export default function SearchByCategory() {
  const [categories, setCategories] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [products, setProducts] = useState([]);
  const [alchType, setAlchType] = useState([]);
  const [glass, setGlass] = useState([]);
  const [closeBtn, setCloseBtn] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchIngredient();
  }, []);

  // const fetchFilterUrl = async () => {
  //   try {
  //     const response = await fetch(categoriesUrl);
  //     const { drinks } = await response.json();
  //     console.log('categories', drinks);
  //     setCategories(drinks);
  //   } catch (error) {
  //     console.error('Error fetching data', error);
  //   }
  // };
  const fetchCategories = async () => {
    try {
      const response = await fetch(categoriesUrl);
      const { drinks } = await response.json();
      console.log('categories', drinks);
      setCategories(drinks);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const fetchIngredient = async () => {
    try {
      const response = await fetch(ingredientsUrl);
      //console.log(response);
      const { drinks } = await response.json();
      console.log('ingredients', drinks);
      setIngredient(drinks);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };
  const fetchProduct = async (category) => {
    console.log(category);
    setCloseBtn(true);
    try {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=' + category);
      const { drinks } = await response.json();
      console.log(drinks);
      setProducts(drinks);
    } catch (error) {
      console.log('Error fetching products', error);
    }
  };
  const fetchProductByIngredient = async (ingredient) => {
    console.log(ingredient);
    setCloseBtn(true);
    try {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + ingredient);
      const { drinks } = await response.json();
      console.log(drinks);
      setProducts(drinks);
    } catch (error) {
      console.log('Error fetching products', error);
    }
  };
  const closeButton = () => {
    setCloseBtn(false);
  };
  return (
    <>
      <div className="container search">
        <h2>Search by Categories</h2>
        <div className="search-category">
          {closeBtn && (
            <button className="close category" onClick={closeButton}>
              X
            </button>
          )}
          {categories.map((category) => (
            <button key={category.setCategories} className="categoryBtn" onClick={() => fetchProduct(category.strCategory)}>
              {category.strCategory}
            </button>
          ))}
        </div>
        <h2>Search by Ingredients</h2>
        <div className="search-category ">
          {closeBtn && (
            <button className="close category" onClick={closeButton}>
              X
            </button>
          )}
          {ingredient.map((ingredient) => (
            <button key={ingredient.strIngredient1} className="categoryBtn" onClick={() => fetchProductByIngredient(ingredient.strIngredient1)}>
              {ingredient.strIngredient1}
            </button>
          ))}
        </div>
      </div>
      <div className="cocktails-container">
        {closeBtn && (
          <button className="close" onClick={closeButton}>
            X
          </button>
        )}
        {closeBtn &&
          products.map((product) => (
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
