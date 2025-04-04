import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Badge, Stack } from "@mui/material";
import { ShoppingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { HOME, SHOP } from "../../constants/routes";
import SearchBar from "./SearchBar";
import MicIcon from "@mui/icons-material/Mic";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "white",
    border: "1px solid black",
    display: "flex",
    alignItems: "center",
    padding: "4px 8px",
    "&:hover": {
        backgroundColor: "#f5f5f5",
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "black",

}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "black",
    flexGrow: 1,
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(2)})`,
        transition: theme.transitions.create("width"),
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",

            },
        },
    },
}));

function Navigation() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [query, setQuery] = useState("");

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };


    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // Handle search
    const handleSearch = (searchQuery) => {
        setQuery(searchQuery);
        console.log("Searching for:", searchQuery);
        // Implement search logic here
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#f9f9f9" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontWeight: 700,
                            textDecoration: "none",
                            color: "black",
                        }}
                    >
                        VocalCart
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                            keepMounted
                            transformOrigin={{ vertical: "top", horizontal: "left" }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: "block", md: "none" } }}
                        >
                            {["Home", "Shop"].map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            color: "black",
                            textDecoration: "none",
                        }}
                    >
                        VocalCart
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        <Button
                            component={Link}
                            to={HOME}
                            sx={{ my: 2, color: "black", display: "block" }}
                        >
                            Home
                        </Button>
                        <Button
                            component={Link}
                            to={SHOP}
                            sx={{ my: 2, color: "black", display: "block" }}
                        >
                            Shop
                        </Button>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Stack direction="row" spacing={2}>
                            {/* Styled SearchBar with Text & Voice Search */}
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ "aria-label": "search" }}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                {/* Voice Search Button */}
                                <IconButton
                                    onClick={() => {
                                        const recognition = new window.webkitSpeechRecognition();
                                        recognition.onresult = (event) => {
                                            const text = event.results[0][0].transcript;
                                            setQuery(text);
                                            handleSearch(text);
                                        };
                                        recognition.start();
                                    }}
                                >
                                    <MicIcon style={{ color: "black" }} />
                                </IconButton>
                                {/* Search Button */}
                                <Button
                                    onClick={() => handleSearch(query)}
                                    variant="contained"
                                    sx={{ backgroundColor: "black", color: "white", ml: 1 }}
                                >
                                    Search
                                </Button>
                            </Search>

                            <Badge badgeContent={1} color="error">
                                <ShoppingOutlined
                                    style={{ color: "black", fontSize: "1.5rem" }}
                                />
                            </Badge>
                        </Stack>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navigation;
