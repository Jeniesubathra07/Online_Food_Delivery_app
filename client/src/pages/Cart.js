import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  AppBar,
  Toolbar,
  Badge,
} from '@mui/material';
import { Add, Remove, Delete, Home, ShoppingCart, RestaurantMenu } from '@mui/icons-material';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: '#000000',
      pt: 8,
    }}>
      <AppBar 
        position="fixed" 
        color="transparent" 
        elevation={0}
        sx={{
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Toolbar>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              color: '#D4AF37',
              fontFamily: 'serif',
              fontWeight: 600,
            }}
          >
            Moma Restaurant
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={() => navigate('/')}
              sx={{
                color: '#D4AF37',
                mr: 2,
                '&:hover': {
                  transform: 'scale(1.1)',
                  transition: 'transform 0.2s',
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                },
              }}
            >
              <Home />
            </IconButton>
            <IconButton
              onClick={() => navigate('/menu')}
              sx={{
                color: '#D4AF37',
                mr: 2,
                '&:hover': {
                  transform: 'scale(1.1)',
                  transition: 'transform 0.2s',
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                },
              }}
            >
              <RestaurantMenu />
            </IconButton>
            <IconButton
              component={Link}
              to="/cart"
              sx={{
                color: '#D4AF37',
                '&:hover': {
                  transform: 'scale(1.1)',
                  transition: 'transform 0.2s',
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                },
              }}
            >
              <Badge badgeContent={cartItems.length} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            color: '#D4AF37',
            fontFamily: 'serif',
            fontWeight: 600,
            mb: 4,
            textAlign: 'center',
          }}
        >
          Shopping Cart
        </Typography>

        {cartItems.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                mb: 3,
              }}
            >
              Your cart is empty
            </Typography>
            <Button
              component={Link}
              to="/menu"
              variant="contained"
              sx={{
                background: 'linear-gradient(45deg, #D4AF37 30%, #FFD700 90%)',
                color: 'black',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FFD700 30%, #D4AF37 90%)',
                },
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {cartItems.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Card 
                  sx={{ 
                    display: 'flex',
                    bgcolor: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(212, 175, 55, 0.1)',
                    boxShadow: '0 2px 10px rgba(212, 175, 55, 0.15)',
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 140 }}
                    image={item.image}
                    alt={item.name}
                  />
                  <CardContent sx={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="h6" sx={{ color: '#D4AF37' }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        ₹{item.price}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton 
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        sx={{ color: '#D4AF37' }}
                      >
                        <Remove />
                      </IconButton>
                      <Typography sx={{ color: '#D4AF37', mx: 1 }}>
                        {item.quantity}
                      </Typography>
                      <IconButton 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        sx={{ color: '#D4AF37' }}
                      >
                        <Add />
                      </IconButton>
                      <IconButton 
                        onClick={() => removeFromCart(item.id)}
                        sx={{ color: '#D4AF37', ml: 2 }}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end',
                  mt: 3,
                  p: 2,
                  bgcolor: 'rgba(0, 0, 0, 0.8)',
                  border: '1px solid rgba(212, 175, 55, 0.1)',
                  borderRadius: 1,
                }}
              >
                <Typography variant="h5" sx={{ color: '#D4AF37' }}>
                  Total: ₹{calculateTotal()}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ 
                mt: 4, 
                p: 3,
                maxWidth: '400px',
                margin: '0 auto',
                bgcolor: 'rgba(0, 0, 0, 0.8)',
                borderRadius: 1,
                border: '1px solid rgba(212, 175, 55, 0.3)',
              }}>
                <Typography variant="h6" sx={{ 
                  color: '#D4AF37', 
                  mb: 2,
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}>
                  Total: ₹{calculateTotal()}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => navigate('/payment')}
                  sx={{
                    display: 'block',
                    width: '80%',
                    margin: '0 auto',
                    bgcolor: '#D4AF37',
                    color: '#000000',
                    '&:hover': {
                      bgcolor: '#B4941F',
                    },
                    fontWeight: 'bold',
                    py: 1.5,
                    fontSize: '1.1rem',
                    textTransform: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  Proceed to Payment
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Cart;
