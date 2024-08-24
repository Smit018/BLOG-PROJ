import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Header = () => {
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (location.pathname === "/blogs") {
      setValue(0);
    } else if (location.pathname === "/my-blogs") {
      setValue(1);
    } else if (location.pathname === "/create-blog") {
      setValue(2);
    }
  }, [location.pathname]);

  // Logout handler
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  // Menu handlers
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuSelect = (path) => {
    handleMenuClose();
    navigate(path);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: theme.palette.primary.main }}>
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          My Blog APP
        </Typography>
        {isLogin && !isMobile && (
          <Box sx={{ flexGrow: 1 }}>
            <Tabs
              value={value}
              onChange={(e, val) => setValue(val)}
              textColor="inherit"
              indicatorColor="secondary"
              centered
            >
              <Tab label="Blogs" component={Link} to="/blogs" />
              <Tab label="My Blogs" component={Link} to="/my-blogs" />
              <Tab label="Create Blog" component={Link} to="/create-blog" />
            </Tabs>
          </Box>
        )}
        {isLogin && isMobile && (
          <Box>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleMenuSelect("/blogs")}>Blogs</MenuItem>
              <MenuItem onClick={() => handleMenuSelect("/my-blogs")}>My Blogs</MenuItem>
              <MenuItem onClick={() => handleMenuSelect("/create-blog")}>Create Blog</MenuItem>
            </Menu>
          </Box>
        )}
        <Box>
          {!isLogin ? (
            <>
              <Button
                sx={{ margin: 1 }}
                variant="outlined"
                color="inherit"
                component={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                sx={{ margin: 1 }}
                variant="outlined"
                color="inherit"
                component={Link}
                to="/register"
              >
                Register
              </Button>
            </>
          ) : (
            <Button
              sx={{ margin: 1 }}
              variant="outlined"
              color="inherit"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
