import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AdminDashboardLayout from "../../../components/common/Drawer";
import ProductCard from "../../../components/common/ProductCard";

export default function ListProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products`
        );
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <AdminDashboardLayout>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {loading && (
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
        )}

        {error && (
          <Alert severity="error" sx={{ my: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <ProductCard
                name={product.productName || product.name}
                price={product.offerPrice || product.price}
                imageUrl={`http://localhost:8000${product.imageUrl}`}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </AdminDashboardLayout>
  );
}
