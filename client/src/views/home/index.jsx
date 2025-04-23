import { Box, Button, CircularProgress, Container, Grid, Typography } from "@mui/material";
import prod1 from '../../images/1.png';
import prod2 from '../../images/2.png';
import prod3 from '../../images/3.png';
import prod4 from '../../images/4.png';
import prod5 from '../../images/5.png';
import ProductCard from "../../components/common/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './swiper.css';
import { Navigation } from 'swiper/modules';

const Home = ({ products }) => {
    const [visibleCount, setVisibleCount] = useState(20);
    const [isLoading, setIsLoading] = useState(true);

    const [defaultProducts, setDefaultProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);
                setDefaultProducts(response.data || []);
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const allProducts = products?.length > 0 ? products : defaultProducts;
    const visibleProducts = allProducts.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 20);
    };


    return (
        <Container maxWidth="xl" sx={{ pb: 6 }}>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                <SwiperSlide>
                    <img src={prod3} alt="prod1" height='100%' width='100%' />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={prod2} alt="prod1" height='100%' width='100%' />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={prod1} alt="prod1" height='100%' width='100%' />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={prod4} alt="prod1" height='100%' width='100%' />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={prod5} alt="prod1" height='100%' width='100%' />
                </SwiperSlide>
            </Swiper>
            <Typography variant="h5" my={4} fontWeight={600}>Products</Typography>

            {isLoading ? (
                <Box m={4} textAlign="center">
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Grid container spacing={2}>
                        {visibleProducts.map((product) => (
                            <Grid key={product._id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                                <ProductCard
                                    id={product._id}
                                    name={product.name || product.productName}
                                    price={product.price || product.offerPrice}
                                    imageUrl={
                                        product.imageUrl?.startsWith("http")
                                            ? product.imageUrl
                                            : `${process.env.REACT_APP_API_URL}${product.imageUrl}`
                                    }
                                />
                            </Grid>
                        ))}
                    </Grid>

                    {visibleCount < allProducts.length && (
                        <Box m={4} textAlign="center">
                            <Button
                                variant="outlined"
                                onClick={handleLoadMore}
                                sx={{ backgroundColor: "black", color: 'white', px: 2, py: 1 }}
                            >
                                Load More
                            </Button>
                        </Box>
                    )}
                </>
            )}
        </Container>
    );
};

export default Home;
