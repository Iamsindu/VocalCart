import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function ProductCard({ name, price, imageUrl }) {
    return (
        <Card
            sx={{
                width: 300,
                p: 1,
                height: 350,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <CardMedia
                sx={{ height: 254, borderRadius: 2 }}
                image={imageUrl}
                title={name}
            />
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography
                    variant="body1"
                    sx={{
                        fontWeight: 500,
                        textTransform: 'capitalize',
                        mb: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        minHeight: '3em',
                    }}
                >
                    {name}
                </Typography>
                <Typography variant='h6' fontWeight={600}>
                    ${price}
                </Typography>
            </CardContent>
        </Card>
    );
}
