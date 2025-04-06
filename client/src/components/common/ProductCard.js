import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function ProductCard({ name, price, imageUrl }) {
    return (
        <Card sx={{ width: 300, p: 1 }}>
            <CardMedia
                sx={{ height: 254, borderRadius: 2 }}
                image={imageUrl}
                title="shoes"
            />
            <CardContent sx={{ p: 2 }}>
                <Typography gutterBottom variant="h6">
                    {name.length > 40 ? name.substring(0, 40) + '...' : name}
                </Typography>
                <Typography variant='h6' fontWeight={600}>
                    ${price}
                </Typography>
            </CardContent>
        </Card>
    );
}
