import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import ProductCard from "../components/common/ProductCard";

const CategoryProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
        const filtered = res.data.filter(
          (product) => (product.category || "Uncategorized") === category
        );
        setProducts(filtered);
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f5f5f5" }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        {category}
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={3}>
            <ProductCard
              id={product._id}
              name={product.productName}
              price={product.offerPrice}
              imageUrl={
                product.imageUrl
                  ? `${process.env.REACT_APP_API_URL}${product.imageUrl}`
                  : "/default-image.jpg"
              }
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryProducts;
