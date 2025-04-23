import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Stack,
  Box,
} from '@mui/material';
import AdminDashboardLayout from '../../../components/common/Drawer';

const validationSchema = Yup.object({
  productName: Yup.string().required('Product name is required'),
  category: Yup.string().required('Category is required'),
  subCategory: Yup.string().required('Sub-category is required'),
  description: Yup.string().required('Description is required'),
  stockStatus: Yup.string().required('Stock status is required'),
  discount: Yup.number().min(0, 'Discount must be at least 0'),
  offerPrice: Yup.number().min(0, 'Offer price must be at least 0'),
});

export const categories = {
  Electronics: ['Computers & Tablets', 'TV & Home Theater', 'Smart Home'],
  Fashion: ['Men', 'Women', 'Kids'],
  Appliances: ['AC', 'Refrigerators', 'Washing Machines'],
  Beauty: ['Makeup', 'Skincare', 'Haircare'],
  Sports: ['Fitness Equipment', 'Outdoor Gear', 'Sportswear'],
  HomeDecor: ['Furniture', 'Lighting', 'Wall Art', 'Curtains'],
  Books: ['Fiction', 'Non-fiction', 'Comics', 'Educational'],
  Grocery: ['Vegetables', 'Snacks', 'Beverages', 'Packaged Foods'],
  Automotive: ['Car Accessories', 'Bike Accessories', 'Oils & Lubricants'],
  Toys: ['Educational Toys', 'Soft Toys', 'Action Figures'],
  BabyCare: ['Diapers', 'Baby Food', 'Toys & Accessories'],
  Footwear: ['Men', 'Women', 'Kids'],
};


export default function AddProduct() {
  const [imagePreview, setImagePreview] = useState(null);

  const initialValues = {
    productName: '',
    image: null,
    category: '',
    subCategory: '',
    description: '',
    stockStatus: '',
    discount: '',
    offerPrice: '',
  };

  const handleImageChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue("image", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();

      for (const key in values) {
        if (key === "image" && values[key]) {
          formData.append("image", values[key]);
        } else {
          formData.append(key, values[key]);
        }
      }

      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/products`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

    } catch (error) {
      console.error('Error creating product:', error.response?.data || error.message);
    }
  };


  return (
    <AdminDashboardLayout>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}
      >
        {({ errors, touched, handleChange, handleBlur, values, setFieldValue }) => (
          <Box sx={{ minHeight: '100vh', py: 5 }}>
            <Typography variant="h4" gutterBottom>
              Create New Product
            </Typography>
            <Form>
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="Product Name"
                  name="productName"
                  value={values.productName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.productName && Boolean(errors.productName)}
                  helperText={touched.productName && errors.productName}
                />

                <Button variant="outlined" component="label" fullWidth>
                  Upload Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, setFieldValue)}
                  />
                </Button>
                {imagePreview && (
                  <Card sx={{ mt: 2 }}>
                    <CardMedia
                      component="img"
                      height="450"
                      image={imagePreview}
                      alt="Product Preview"
                    />
                    <CardContent>
                      <Typography variant="body2">Image Preview</Typography>
                    </CardContent>
                  </Card>
                )}

                <FormControl
                  fullWidth
                  error={touched.category && Boolean(errors.category)}
                >
                  <InputLabel>Category</InputLabel>
                  <Select
                    label="Category"
                    name="category"
                    value={values.category}
                    onChange={(e) => {
                      handleChange(e);
                      setFieldValue("subCategory", "");
                    }}
                    onBlur={handleBlur}
                  >
                    {Object.keys(categories).map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.category && errors.category && (
                    <FormHelperText>{errors.category}</FormHelperText>
                  )}
                </FormControl>

                <FormControl
                  fullWidth
                  error={touched.subCategory && Boolean(errors.subCategory)}
                >
                  <InputLabel>Sub Category</InputLabel>
                  <Select
                    label="Sub category"
                    name="subCategory"
                    value={values.subCategory}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={!values.category}
                  >
                    {values.category &&
                      categories[values.category].map((sub) => (
                        <MenuItem key={sub} value={sub}>
                          {sub}
                        </MenuItem>
                      ))}
                  </Select>
                  {touched.subCategory && errors.subCategory && (
                    <FormHelperText>{errors.subCategory}</FormHelperText>
                  )}
                </FormControl>

                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  label="Short Description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />

                <FormControl
                  fullWidth
                  error={touched.stockStatus && Boolean(errors.stockStatus)}
                >
                  <InputLabel>Stock Status</InputLabel>
                  <Select
                    name="stockStatus"
                    label="Stock status"
                    value={values.stockStatus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="in_stock">In Stock</MenuItem>
                    <MenuItem value="out_of_stock">Out of Stock</MenuItem>
                  </Select>
                  {touched.stockStatus && errors.stockStatus && (
                    <FormHelperText>{errors.stockStatus}</FormHelperText>
                  )}
                </FormControl>

                <TextField
                  fullWidth
                  label="Discount (%)"
                  name="discount"
                  type="number"
                  value={values.discount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.discount && Boolean(errors.discount)}
                  helperText={touched.discount && errors.discount}
                />

                <TextField
                  fullWidth
                  label="Offer Price"
                  name="offerPrice"
                  type="number"
                  value={values.offerPrice}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.offerPrice && Boolean(errors.offerPrice)}
                  helperText={touched.offerPrice && errors.offerPrice}
                />

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Add Product
                </Button>
              </Stack>
            </Form>
          </Box>
        )}
      </Formik>
    </AdminDashboardLayout>
  );
}
