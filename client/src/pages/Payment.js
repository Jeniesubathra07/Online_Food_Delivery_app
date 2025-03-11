import React, { useState } from 'react';
import { Container, Typography, Box, Button, TextField, Grid, Paper, AppBar, Toolbar, IconButton, Badge, Fade, CircularProgress } from '@mui/material';
import { Home as HomeIcon, RestaurantMenu, ShoppingCart, CreditCard } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Payment = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Card number validation (16 digits)
    if (!/^\d{16}$/.test(formData.cardNumber)) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }

    // Expiry date validation (MM/YY format)
    if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Please enter a valid date (MM/YY)';
    }

    // CVV validation (3 or 4 digits)
    if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    // Name validation
    if (formData.name.trim().length < 3) {
      newErrors.name = 'Please enter your full name';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value
        .replace(/\D/g, '')
        .slice(0, 4)
        .replace(/(\d{2})(\d)/, '$1/$2');
    }

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\D/g, '').slice(0, 16);
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsProcessing(true);
      
      // Simulate payment processing
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        navigate('/payment-success');
      } catch (error) {
        setErrors({ submit: 'Payment failed. Please try again.' });
        setIsProcessing(false);
      }
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#000000' }}>
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
              <HomeIcon />
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
              onClick={() => navigate('/cart')}
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

      <Fade in timeout={800}>
        <Container maxWidth="md" sx={{ pt: 12, pb: 4 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              mb: 4, 
              color: '#D4AF37',
              textAlign: 'center',
              fontFamily: 'serif',
              animation: 'fadeInDown 0.5s ease-out'
            }}
          >
            Payment Details
          </Typography>

          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              bgcolor: 'rgba(0, 0, 0, 0.8)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              transform: 'translateY(0)',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)',
              }
            }}
          >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ color: '#D4AF37', mb: 2, display: 'flex', alignItems: 'center' }}>
                    <CreditCard sx={{ mr: 1 }} />
                    Order Total: ₹{total}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Card Number"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    error={!!errors.cardNumber}
                    helperText={errors.cardNumber}
                    variant="outlined"
                    placeholder="1234 5678 9012 3456"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: '#D4AF37',
                        '& fieldset': {
                          borderColor: 'rgba(212, 175, 55, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: '#D4AF37',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#D4AF37',
                        }
                      },
                      '& .MuiInputLabel-root': {
                        color: '#D4AF37',
                      },
                      '& .MuiFormHelperText-root': {
                        color: '#ff6b6b',
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Expiry Date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    error={!!errors.expiryDate}
                    helperText={errors.expiryDate}
                    variant="outlined"
                    placeholder="MM/YY"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: '#D4AF37',
                        '& fieldset': {
                          borderColor: 'rgba(212, 175, 55, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: '#D4AF37',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#D4AF37',
                        }
                      },
                      '& .MuiInputLabel-root': {
                        color: '#D4AF37',
                      },
                      '& .MuiFormHelperText-root': {
                        color: '#ff6b6b',
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="CVV"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    error={!!errors.cvv}
                    helperText={errors.cvv}
                    variant="outlined"
                    type="password"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: '#D4AF37',
                        '& fieldset': {
                          borderColor: 'rgba(212, 175, 55, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: '#D4AF37',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#D4AF37',
                        }
                      },
                      '& .MuiInputLabel-root': {
                        color: '#D4AF37',
                      },
                      '& .MuiFormHelperText-root': {
                        color: '#ff6b6b',
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name on Card"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: '#D4AF37',
                        '& fieldset': {
                          borderColor: 'rgba(212, 175, 55, 0.3)',
                        },
                        '&:hover fieldset': {
                          borderColor: '#D4AF37',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#D4AF37',
                        }
                      },
                      '& .MuiInputLabel-root': {
                        color: '#D4AF37',
                      },
                      '& .MuiFormHelperText-root': {
                        color: '#ff6b6b',
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    disabled={isProcessing}
                    sx={{
                      mt: 2,
                      bgcolor: '#D4AF37',
                      color: '#000000',
                      '&:hover': {
                        bgcolor: '#B4941F',
                      },
                      fontWeight: 'bold',
                      py: 1.5,
                      position: 'relative'
                    }}
                  >
                    {isProcessing ? (
                      <>
                        <CircularProgress
                          size={24}
                          sx={{
                            color: '#000000',
                            position: 'absolute',
                            left: '50%',
                            marginLeft: '-12px'
                          }}
                        />
                        Processing...
                      </>
                    ) : (
                      `Pay ₹${total}`
                    )}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </Fade>
    </Box>
  );
};

export default Payment;
