import { Button, CircularProgress, Container, Divider, Stack, Typography } from "@mui/material";
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products/${id}`);
                setProduct(response.data);
            } catch (err) {
                console.error("Failed to fetch product:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [id]);


    if (isLoading) {
        return (
            <Container maxWidth="xl" sx={{ textAlign: 'center', mt: 10 }}>
                <CircularProgress />
            </Container>
        );
    }

    if (!product) {
        return (
            <Container maxWidth="xl" sx={{ textAlign: 'center', mt: 10 }}>
                <Typography variant="h6">Product not found.</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="xl" m={2}>
            <Stack my={10} spacing={10} direction="row" sx={{ width: '100%' }}>
                <Stack sx={{ width: '50%' }}>
                    <img
                        src={
                            product.imageUrl?.startsWith("http")
                                ? product.imageUrl
                                : `${process.env.REACT_APP_API_URL}${product.imageUrl}`
                        }
                        alt={product.name}
                        style={{ borderRadius: '12px', maxWidth: '100%' }}
                    />
                </Stack>
                <Stack spacing={4} sx={{ width: '40%' }}>
                    <Typography
                        variant="caption"
                        fontWeight={600}
                        sx={{
                            color: product.stockStatus === 'in_stock' ? 'success.main' : 'error.main',
                        }}
                    >
                        {product.stockStatus === 'in_stock' ? 'In Stock' : 'Out of Stock'}
                    </Typography>

                    <Typography variant="h5" fontWeight={700} sx={{ color: '#1C252E' }}>
                        {product.productName || product.name}
                    </Typography>
                    <Typography variant="h5" fontWeight={700} sx={{ color: '#1C252E' }}>
                        {product.offerPrice || product.price}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ color: '#637381' }}>
                        {product.description}
                    </Typography>

                    <Divider my={2} />

                    <Stack direction='row' spacing={2}>
                        <Button size="large" variant="contained" sx={{ backgroundColor: '#FFAB00', color: '#1C252E', fontWeight: 700, textTransform: 'none' }} startIcon={<ShoppingCartRoundedIcon />}>
                            Add to cart
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    );
};

export default ProductDetail;
