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
  const [alchType, setAlchType] = useState([]);
  const [glass, setGlass] = useState([]);
  const [products, setProducts] = useState([]);
  const [closeBtn, setCloseBtn] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesResponse, ingredientResponse, alchNonAlchResponse, glassesResponse] = await Promise.all([fetch(categoriesUrl), fetch(ingredientsUrl), fetch(alchNonAlchUrl), fetch(glassesUrl)]);

      const [categoriesData, ingredientData, alchNonAlchData, glassesData] = await Promise.all([
        categoriesResponse.json(),
        ingredientResponse.json(),
        alchNonAlchResponse.json(),
        glassesResponse.json(),
      ]);

      setCategories(categoriesData.drinks);
      setIngredient(ingredientData.drinks);
      setAlchType(alchNonAlchData.drinks);
      setGlass(glassesData.drinks);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const fetchProducts = async (param, type) => {
    setCloseBtn(true);
    try {
      let url;
      switch (type) {
        case 'category':
          url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=' + param;
          break;
        case 'ingredient':
          url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + param;
          break;
        case 'alchType':
          url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=' + param;
          break;
        case 'glass':
          url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=' + param;
          break;
        default:
          break;
      }
      console.log('param', param, 'type', type);
      const response = await fetch(`${url}${param}`);
      const { drinks } = await response.json();
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
            <button key={category.strCategory} className="categoryBtn" onClick={() => fetchProducts(category.strCategory, 'category')}>
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
            <button key={ingredient.strIngredient1} className="categoryBtn" onClick={() => fetchProducts(ingredient.strIngredient1, 'ingredient')}>
              {ingredient.strIngredient1}
            </button>
          ))}
        </div>
        <h2>Search by type</h2>
        <div className="search-category">
          {closeBtn && (
            <button className="close category" onClick={closeButton}>
              X
            </button>
          )}
          {alchType.map((type) => (
            <button key={type.strAlcoholic} className="categoryBtn" onClick={() => fetchProducts(type.strAlcoholic, 'alchType')}>
              {type.strAlcoholic}
            </button>
          ))}
        </div>
        <h2>Search by glass</h2>
        <div className="search-category">
          {closeBtn && (
            <button className="close category" onClick={closeButton}>
              X
            </button>
          )}
          {glass.map((glass) => (
            <button key={glass.strGlass} className="categoryBtn" onClick={() => fetchProducts(glass.strGlass, 'glass')}>
              {glass.strGlass}
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
