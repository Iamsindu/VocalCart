import React from "react";
import axios from "axios";
import { useState } from "react";
import SearchBar from "./components/common/SearchBar";
import ProductList from "./components/ProductList";
import AppRouter from "./routers/AppRouter";

const App = () => {
  const [products, setProducts] = useState([]);

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/search?query=${query}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
      <AppRouter />
      <SearchBar onSearch={handleSearch} />
      <ProductList products={products} />
    </div>
  );
};

export default App;
