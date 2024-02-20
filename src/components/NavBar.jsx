import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { FaCocktail } from "react-icons/fa";
export default function NavBar() {
  return (
    <div>
      <nav>
        <div className="nav-items container">
          <div className="logo">
            <a href="/">
              <h1>
                <FaCocktail />
                Drinks
              </h1>
            </a>
          </div>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/drinks">Drinks</NavLink>
            </li>
            <li>
              <NavLink to="/search">Search</NavLink>
            </li>
            <li>
              <NavLink to="/random">Random Drink</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
