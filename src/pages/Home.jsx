import React from "react";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="container">
      <div className="banner-container">
        <div className="banner">
          <p>Lets check out a range of drinks, from classic cocktails to trendy ones. Lets find your favourites!</p>
          <Link to="/drinks">
            <div className="btn">View Cocktails</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
