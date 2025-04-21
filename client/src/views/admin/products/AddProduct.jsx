import React, { useState } from 'react';
import { Formik, Form } from 'formik';
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
import { categories } from '../../../_mock/_data';
import { validationSchema } from './ValidationSchema';

export default function AddProduct() {
    const [imagePreview, setImagePreview] = useState(null);

    const initialValues = {
        name: '',
        price: '',
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
        setFieldValue('image', file);
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
                if (key === 'image' && values[key]) {
                    formData.append('image', values[key]);
                } else {
                    formData.append(key, values[key]);
                }
            }

            const response = await axios.post('http://localhost:8000/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Product created:', response.data);
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
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.name && Boolean(errors.name)}
                                    helperText={touched.name && errors.name}
                                />

                                <TextField
                                    fullWidth
                                    label="Price"
                                    name="price"
                                    value={values.price}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.price && Boolean(errors.price)}
                                    helperText={touched.price && errors.price}
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

                                <FormControl fullWidth error={touched.category && Boolean(errors.category)}>
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        label="Category"
                                        name="category"
                                        value={values.category}
                                        onChange={(e) => {
                                            handleChange(e);
                                            setFieldValue('subCategory', '');
                                        }}
                                        onBlur={handleBlur}
                                    >
                                        {Object.keys(categories).map((cat) => (
                                            <MenuItem key={cat} value={cat}>
                                                {cat}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {touched.category && errors.category && <FormHelperText>{errors.category}</FormHelperText>}
                                </FormControl>

                                <FormControl fullWidth error={touched.subCategory && Boolean(errors.subCategory)}>
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
                                    {touched.subCategory && errors.subCategory && <FormHelperText>{errors.subCategory}</FormHelperText>}
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

                                <FormControl fullWidth error={touched.stockStatus && Boolean(errors.stockStatus)}>
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
                                    {touched.stockStatus && errors.stockStatus && <FormHelperText>{errors.stockStatus}</FormHelperText>}
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

                                <Button fullWidth variant="contained" color="primary" type="submit">
                                    Add Product
                                </Button>
                            </Stack>

                        </Form>
                    </Box>
                )}
            </Formik>
        </AdminDashboardLayout >
    );
}
