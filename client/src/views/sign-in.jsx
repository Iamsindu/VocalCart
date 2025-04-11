import React from 'react';
import { Box, Button, Container, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import { useState, useCallback } from 'react';
import { useRouter } from '../hooks';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

const SignInView = () => {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const handleSignIn = useCallback(() => {
        router.push('/');
    }, [router]);

    const renderForm = (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'flex-end',
                flexDirection: 'column',
                pb: 2
            }}
        >
            <TextField
                fullWidth
                name="email"
                label="Email address"
                defaultValue="hello@gmail.com"
                sx={{ mb: 3 }}
                slotProps={{
                    inputLabel: { shrink: true },
                }}
            />

            <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
                Forgot password?
            </Link>

            <TextField
                fullWidth
                name="password"
                label="Password"
                defaultValue="@demo1234"
                type={showPassword ? 'text' : 'password'}
                slotProps={{
                    inputLabel: { shrink: true },
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    {showPassword ? <VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    },
                }}
                sx={{ mb: 3 }}
            />

            <Button
                fullWidth
                size="large"
                type="submit"
                color="inherit"
                variant="contained"
                onClick={handleSignIn}
            >
                Sign in
            </Button>
        </Box>
    );

    return (
        <Container maxWidth='sm' >
            <Box sx={{ backgroundColor: '#F9FAFB', maxWidth: '420px', borderRadius: '12px', p: 2 }}>
                <Box
                    sx={{
                        gap: 1.5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        my: 5,
                    }}
                >
                    <Typography variant="h5">Sign in</Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'text.secondary',
                        }}
                    >
                        Don’t have an account?
                        <Link variant="subtitle2" sx={{ ml: 0.5 }}>
                            Get started
                        </Link>
                    </Typography>
                </Box>
                {renderForm}
            </Box>
        </Container>
    );
}

export default SignInView;