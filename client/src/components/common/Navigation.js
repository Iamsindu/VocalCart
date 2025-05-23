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
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { Link } from "react-router-dom";
import { HOME, SHOP } from "../../constants/routes";
import MicIcon from "@mui/icons-material/Mic";
import axios from "axios";

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
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
  },
}));

const Navigation = ({ setProducts }) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [query, setQuery] = useState("");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const searchReq = async (query) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/search?query=${query}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      searchReq(query);
    }
  };

  const handleVoiceSearch = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setQuery(text);
      searchReq(text);
    };
    recognition.start();
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

          <Box>
            <Stack direction="row" spacing={2} alignItems='center'>
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
                <IconButton onClick={handleVoiceSearch}>
                  <MicIcon style={{ color: "black" }} />
                </IconButton>
                <Button
                  onClick={() => handleSearch(query)}
                  variant="contained"
                  sx={{ backgroundColor: "black", color: "white", ml: 1 }}
                >
                  Search
                </Button>
              </Search>

              <Badge badgeContent={1} color="error">
                <ShoppingBagOutlinedIcon size='large' style={{ color: 'black' }} />
              </Badge>
            </Stack>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;
