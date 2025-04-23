import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function ProductCard({ id, name, price, imageUrl }) {
    return (
        <Card
            sx={{
                width: 300,
                p: 1,
                height: 380,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <Link to={`/products/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                    <Typography variant='h6' fontWeight={600} mb={3}>
                        ${price}
                    </Typography>
                </CardContent>
            </Link>
        </Card>
    );
}
