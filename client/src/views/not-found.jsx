import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { HOME } from '../constants/routes';

export function NotFoundView() {
    return (
        <>
            <Container
                sx={{
                    py: 10,
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h3" sx={{ mb: 2 }}>
                    Sorry, page not found!
                </Typography>

                <Typography mb={4} sx={{ color: 'text.secondary', maxWidth: 480, textAlign: 'center' }}>
                    Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
                    sure to check your spelling.
                </Typography>

                <Button component={Link} to={HOME} size="large" variant="contained" color="inherit">
                    Go to home
                </Button>
            </Container>
        </>
    );
}