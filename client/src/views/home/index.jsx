import { Box, Button, Container, Stack, Typography } from "@mui/material";
import banner from '../../images/banner.png';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

const Home = () => {
    return (
        <Container maxWidth="xl">
            <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ backgroundColor: '#f3f3f3', maxHeight: '500px' }}>
                <Stack spacing={4} padding='50px' alignItems='flex-start' sx={{ width: '50%' }}>
                    <Typography variant="h4" sx={{ width: '80%', color: '#1a1a1a' }}>See everything with Clarity</Typography>
                    <Typography variant="body1" sx={{ color: '#4a4a4a' }}>Buying eyewear should leave you happy and good-looking, with money in your pocket. Glasses, sunglasses, and contacts—we’ve got your eyes covered.</Typography>
                    <Button variant="contained" size="large" sx={{ backgroundColor: '#101010', textTransform: 'none', padding: '14px 22px' }} endIcon={<ArrowForwardRoundedIcon />}>
                        Shop Now
                    </Button>
                </Stack>
                <Box sx={{ width: '50%' }}>
                    <img src={banner} alt="banner-img" height='100%' width='100%' />
                </Box>
            </Stack>
        </Container>
    );
};

export default Home;
