import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Badge, 
  Box, 
  Avatar, 
  Menu, 
  MenuItem, 
  ListItemIcon,
  Divider 
} from '@mui/material';
import { 
  ShoppingCart, 
  Restaurant, 
  Login, 
  PersonAdd, 
  Person, 
  Dashboard, 
  Logout,
  Man,
  Woman
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { getCartCount } = useCart();
  const { currentUser, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  const handleProfile = () => {
    handleMenuClose();
    navigate('/profile');
  };

  const handleAdmin = () => {
    handleMenuClose();
    navigate('/admin');
  };
  
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          component={Link}
          to="/"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <Restaurant />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Moma Restaurant
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/menu">
          Menu
        </Button>
        
        {/* Shopping Cart Button */}
        <IconButton color="inherit" component={Link} to="/cart" sx={{ mr: 2 }}>
          <Badge badgeContent={getCartCount()} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        
        {/* Login/Register buttons or Profile Menu */}
        {isAuthenticated ? (
          <>
            <Box 
              onClick={handleMenuOpen}
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                cursor: 'pointer',
                '&:hover': { opacity: 0.8 }
              }}
            >
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32,
                  bgcolor: 'primary.main',
                  fontSize: '0.9rem',
                  mr: 1
                }}
              >
                {currentUser.gender === 'female' ? <Woman /> : <Man />}
              </Avatar>
              <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                {currentUser.name}
              </Typography>
            </Box>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                elevation: 3,
                sx: { minWidth: 180 },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleProfile}>
                <ListItemIcon>
                  <Person fontSize="small" />
                </ListItemIcon>
                Profile
              </MenuItem>
              
              {isAdmin && (
                <MenuItem onClick={handleAdmin}>
                  <ListItemIcon>
                    <Dashboard fontSize="small" />
                  </ListItemIcon>
                  Admin Dashboard
                </MenuItem>
              )}
              
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button 
              color="inherit" 
              component={Link} 
              to="/login"
              startIcon={<Login />}
              sx={{ mr: 1 }}
            >
              Login
            </Button>
            <Button 
              color="secondary" 
              component={Link} 
              to="/register"
              startIcon={<PersonAdd />}
              variant="outlined"
            >
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
