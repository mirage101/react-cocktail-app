import React from "react";
import "./NoMatch.css";
export default function NoMatch() {
  return (
    <div>
      <div className="container">
        <div className="error-page">
          <h1 className="error-code">404</h1>
          <p className="error-text">Page not found</p>
        </div>
      </div>
    </div>
  );
}
