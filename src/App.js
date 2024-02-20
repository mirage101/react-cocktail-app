import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import NoMatch from "./components/NoMatch";
import Drinks from "./pages/Drinks";
import ProductDetail from "./pages/ProductDetail";
import SearchByCategory from "./components/SearchByCategory";
import RandomDrink from "./pages/RandomDrink";
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drinks" element={<Drinks />} />
        <Route path="/search" element={<SearchByCategory />} />
        <Route path="/random" element={<RandomDrink />} />
        <Route path="/drink/:drinkId" element={<ProductDetail />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default App;
