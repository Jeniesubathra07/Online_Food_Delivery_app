import { Home as HomeIcon, KeyboardArrowLeft, KeyboardArrowRight, Person, RestaurantMenu, ShoppingCart } from '@mui/icons-material';
import { AppBar, Badge, Box, Button, Container, Grid, IconButton, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

// Using attractive food-related images for backgrounds
const backgroundImages = [
  'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)', // Elegant restaurant interior
  'url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)', // Luxury dining
  'url(https://images.unsplash.com/photo-1592861956120-e524fc739696?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)', // Gourmet dish
  'url(https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)', // Fine dining
  'url(https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)', // Luxurious food setup
];

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const { cartItems } = useCart();
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [direction, setDirection] = useState(null);

  // Minimum swipe distance for transition
  const minSwipeDistance = 50;

  const nextImage = () => {
    setDirection('right');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);
    }, 500);
  };

  const prevImage = () => {
    setDirection('left');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + backgroundImages.length) % backgroundImages.length);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 6000);
    return () => clearInterval(interval);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        nextImage();
      } else if (event.key === 'ArrowLeft') {
        prevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle touch events for swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        position: 'relative',
        overflow: 'hidden',
        touchAction: 'pan-y pinch-zoom',
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Previous Image (for transition) */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          background: backgroundImages[(currentImageIndex - 1 + backgroundImages.length) % backgroundImages.length],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: direction === 'left' && isTransitioning ? 1 : 0,
          transform: direction === 'left' && isTransitioning ? 'scale(1)' : 'scale(1.1)',
          transition: 'opacity 1.5s ease, transform 1.5s ease',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      />

      {/* Current Image */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '10vw',
          height: '100vh',
          background: backgroundImages[currentImageIndex],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: isTransitioning ? 0 : 1,
          transform: isTransitioning ? 'scale(1.1)' : 'scale(1)',
          transition: 'opacity 1.5s ease, transform 1.5s ease',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      />

      {/* Next Image (for transition) */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          background: backgroundImages[(currentImageIndex + 1) % backgroundImages.length],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: direction === 'right' && isTransitioning ? 1 : 0,
          transform: direction === 'right' && isTransitioning ? 'scale(1)' : 'scale(1.1)',
          transition: 'opacity 1.5s ease, transform 1.5s ease',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      />

      {/* Navigation Arrows */}
      {!isMobile && (
        <>
          <IconButton
            onClick={prevImage}
            sx={{
              position: 'absolute',
              left: 20,
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#D4AF37',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.8)',
              },
              zIndex: 2,
            }}
          >
            <KeyboardArrowLeft sx={{ fontSize: 40 }} />
          </IconButton>
          <IconButton
            onClick={nextImage}
            sx={{
              position: 'absolute',
              right: 20,
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#D4AF37',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.8)',
              },
              zIndex: 2,
            }}
          >
            <KeyboardArrowRight sx={{ fontSize: 40 }} />
          </IconButton>
        </>
      )}

      {/* Navigation Dots */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          zIndex: 2,
        }}
      >
        {backgroundImages.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: index === currentImageIndex ? '#D4AF37' : 'rgba(255, 255, 255, 0.5)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              transform: index === currentImageIndex ? 'scale(1.2)' : 'scale(1)',
              '&:hover': {
                backgroundColor: index === currentImageIndex ? '#D4AF37' : 'rgba(255, 255, 255, 0.8)',
              },
            }}
            onClick={() => {
              setDirection(index > currentImageIndex ? 'right' : 'left');
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentImageIndex(index);
                setTimeout(() => {
                  setIsTransitioning(false);
                }, 1000);
              }, 500);
            }}
          />
        ))}
      </Box>

      {/* AppBar */}
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
              component={Link}
              to="/"
              sx={{
                color: '#D4AF37',
                mr: 1,
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
            <IconButton
              component={Link}
              to={isAuthenticated ? "/profile" : "/login"}
              sx={{
                color: '#D4AF37',
                ml: 2,
                '&:hover': {
                  transform: 'scale(1.1)',
                  transition: 'transform 0.2s',
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                },
              }}
            >
              <Person />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Content Container */}
      <Box
        sx={{
          position: 'relative',
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)',
            zIndex: 0,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)',
            zIndex: 0,
          }
        }}
      >
        {/* Removed decorative border that was constraining the page content */}

        <Container maxWidth="xl" sx={{ 
          textAlign: 'center', 
          color: 'white', 
          position: 'relative', 
          zIndex: 2,
          px: { xs: 2, sm: 3, md: 4 },
          width: '100%'
        }}>
          <Typography 
            variant="h1" 
            component="h1" 
            gutterBottom
            sx={{
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              mb: { xs: 3, sm: 4 },
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              background: 'linear-gradient(45deg, #D4AF37 30%, #FFD700 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))',
              fontFamily: 'serif'
            }}
          >
            Moma Restaurant
          </Typography>
          <Typography 
            variant="h5" 
            gutterBottom
            sx={{
              mb: { xs: 3, sm: 4 },
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
              color: '#C0C0C0',
              fontFamily: 'serif',
              fontStyle: 'italic',
              px: { xs: 2, sm: 0 }
            }}
          >
            Experience the royal taste of traditional Indian cuisine
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            <Grid item>
              <Button
                component={Link}
                to="/menu"
                variant="contained"
                size={isMobile ? "medium" : "large"}
                sx={{ 
                  px: { xs: 4, sm: 6 },
                  py: { xs: 1.5, sm: 2 },
                  fontSize: { xs: '1rem', sm: '1.2rem' },
                  borderRadius: '30px',
                  textTransform: 'none',
                  background: 'linear-gradient(45deg, #D4AF37 30%, #FFD700 90%)',
                  border: '1px solid rgba(212, 175, 55, 0.5)',
                  boxShadow: '0 4px 20px rgba(212, 175, 55, 0.25)',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    transition: 'all 0.3s ease-in-out',
                    background: 'linear-gradient(45deg, #FFD700 30%, #D4AF37 90%)',
                    boxShadow: '0 6px 25px rgba(212, 175, 55, 0.35)',
                  }
                }}
              >
                Explore Our Royal Menu
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
