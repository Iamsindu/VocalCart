import { Button, Chip, Container, Divider, Stack, Typography } from "@mui/material";
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import ProductImg from '../images/prod2.png'

const ProductDetail = () => {
    return (
        <Container maxWidth="xl">
            <Stack mt={10} spacing={10} direction="row" sx={{ width: '100%' }}>
                <Stack sx={{ width: '50%' }}>
                    <img src={ProductImg} alt="product-img" style={{ borderRadius: '12px' }} />
                </Stack>
                <Stack spacing={4} sx={{ width: '40%' }}>
                    <Chip label="SALE" size="small" sx={{ width: '10%', backgroundColor: '#FFE5DF', color: '#B71D18', fontWeight: 700 }} />
                    <Typography
                        variant="caption"
                        fontWeight={600}
                        sx={{
                            color: '#22C55E'
                        }}
                    >
                        IN STOCK
                    </Typography>

                    <Typography variant="h5" fontWeight={700} sx={{ color: '#1C252E' }}>Product name </Typography>
                    <Typography variant="h5" fontWeight={700} sx={{ color: '#1C252E' }}>$25.18</Typography>
                    <Typography variant="subtitle2" sx={{ color: '#637381' }}>Featuring the original ripple design inspired by Japanese bullet trains, the Nike Air Max 97 lets you push your style full-speed ahead.
                    </Typography>

                    <Divider my={2} />

                    <Stack direction='row' spacing={2}>
                        <Button size="large" variant="contained" sx={{ backgroundColor: '#FFAB00', color: '#1C252E', fontWeight: 700, textTransform: 'none' }} startIcon={<ShoppingCartRoundedIcon />}>
                            Add to cart
                        </Button>
                        <Button size="large" variant="contained" sx={{ backgroundColor: '#1C252E', textTransform: 'none' }}>Buy now</Button>
                    </Stack>

                </Stack>
            </Stack>
        </Container>
    );
};

export default ProductDetail;
