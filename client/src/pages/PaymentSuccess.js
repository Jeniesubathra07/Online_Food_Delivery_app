import React, { useEffect } from 'react';
import { Container, Typography, Box, Button, Fade, CircularProgress } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger confetti animation
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Redirect to home after 5 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: '#000000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Fade in timeout={1000}>
        <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
          <CheckCircle 
            sx={{ 
              fontSize: 100, 
              color: '#D4AF37',
              mb: 3,
              animation: 'bounce 1s infinite'
            }} 
          />
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              color: '#D4AF37',
              mb: 2,
              fontFamily: 'serif',
            }}
          >
            Payment Successful!
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#D4AF37',
              mb: 4,
              opacity: 0.9
            }}
          >
            Thank you for your order
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <CircularProgress 
              size={20} 
              sx={{ 
                color: '#D4AF37',
                mr: 1
              }} 
            />
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#D4AF37',
                opacity: 0.8
              }}
            >
              Redirecting to home page...
            </Typography>
          </Box>
        </Container>
      </Fade>
    </Box>
  );
};

export default PaymentSuccess;
