import { Container, Stack } from '@mui/material';
import React from 'react';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: "#f9f9f9", padding: '25px 0' }}>
            <Container maxWidth="xl">
                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                    <h2>Developed by Mandala Minds</h2>
                    <span>Copywright @{new Date().getFullYear()}</span>
                </Stack>
            </Container>
        </footer>
    );
};

export default Footer;
