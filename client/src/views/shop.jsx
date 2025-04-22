import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Button,
  Divider,
} from "@mui/material";

const Shop = () => {
  const [productsByCategory, setProductsByCategory] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products`
        );
        const categorized = res.data.reduce((acc, product) => {
          const category = product.category || "Uncategorized";
          if (!acc[category]) acc[category] = [];
          acc[category].push(product);
          return acc;
        }, {});
        setProductsByCategory(categorized);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f5f5f5" }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={5}>
        Shop by Category
      </Typography>

      {Object.entries(productsByCategory).map(([category, products]) => (
        <Box key={category} mb={6}>
          <Typography variant="h5" fontWeight="600" mb={2}>
            {category}
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            {products.slice(0, 5).map((product) => (
              <Grid
                item
                key={product._id}
                sx={{
                  width: 260,
                  display: "flex",
                }}
              >
                <Card
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardActionArea
                    component={Link}
                    to={`/product/${product._id}`}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "stretch",
                      height: "100%",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="180"
                      image={
                        product.imageUrl
                          ? `${process.env.REACT_APP_API_URL}${product.imageUrl}`
                          : "/default-image.jpg"
                      }
                      alt={product.productName}
                      sx={{ objectFit: "cover" }}
                    />

                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        gutterBottom
                        noWrap
                      >
                        {product.productName}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ flexGrow: 1 }}
                      >
                        {product.description?.slice(0, 60) ?? ""}
                      </Typography>

                      <Typography variant="h6" color="green" mt="auto">
                        ${product.offerPrice}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box mt={2} textAlign="right">
            <Button
              component={Link}
              to={`/category/${encodeURIComponent(category)}`}
              variant="text"
              sx={{ fontWeight: 500 }}
            >
              View More →
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Shop;
