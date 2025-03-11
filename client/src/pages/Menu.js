import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Snackbar,
  Drawer,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  Slider,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  useMediaQuery,
  InputAdornment,
  Badge,
} from '@mui/material';
import { useCart } from '../context/CartContext';
import { 
  AddShoppingCart, 
  Search, 
  FilterList,
  Restaurant,
  LocalDining,
  Flatware,
  LocalBar,
  Cake,
  Menu as MenuIcon,
  Close as CloseIcon,
  ShoppingCart,
  Home,
  RestaurantMenu,
} from '@mui/icons-material';

const menuItems = [
  // Starters
  {
    id: 1,
    category: 'starters',
    name: 'Paneer Tikka',
    description: 'Marinated cottage cheese cubes grilled to perfection with Indian spices',
    price: 299,
    image: 'https://images.pexels.com/photos/9609838/pexels-photo-9609838.jpeg',
  },
  {
    id: 2,
    category: 'starters',
    name: 'Samosa Platter',
    description: 'Crispy pastry filled with spiced potatoes and green peas, served with mint chutney',
    price: 149,
    image: 'https://images.pexels.com/photos/8992923/pexels-photo-8992923.jpeg',
  },
  {
    id: 3,
    category: 'starters',
    name: 'Dahi Puri',
    description: 'Crispy puris filled with spiced potatoes, yogurt, and tangy chutneys',
    price: 199,
    image: 'https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg',
  },

  // Main Course
  {
    id: 4,
    category: 'main',
    name: 'Butter Chicken',
    description: 'Tender chicken pieces in rich tomato and butter gravy',
    price: 449,
    image: 'https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg',
  },
  {
    id: 5,
    category: 'main',
    name: 'Paneer Butter Masala',
    description: 'Cottage cheese cubes in creamy tomato gravy',
    price: 399,
    image: 'https://images.pexels.com/photos/12737663/pexels-photo-12737663.jpeg',
  },
  {
    id: 6,
    category: 'main',
    name: 'Dal Makhani',
    description: 'Black lentils slow-cooked with cream and butter',
    price: 349,
    image: 'https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg',
  },
  {
    id: 7,
    category: 'main',
    name: 'Biryani',
    description: 'Fragrant rice dish with tender meat, aromatic spices, and caramelized onions',
    price: 449,
    image: 'https://t4.ftcdn.net/jpg/09/12/10/25/360_F_912102578_dpR2r8IstjbBzQWgn2dAegf6SE2gDPNT.jpg',
  },

  // Breads
  {
    id: 8,
    category: 'breads',
    name: 'Butter Naan',
    description: 'Soft tandoor-baked flatbread brushed with butter',
    price: 69,
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg',
  },
  {
    id: 9,
    category: 'breads',
    name: 'Garlic Roti',
    description: 'Whole wheat flatbread with roasted garlic',
    price: 59,
    image: 'https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg',
  },

  // Desserts
  {
    id: 10,
    category: 'desserts',
    name: 'Gulab Jamun',
    description: 'Deep-fried milk dumplings soaked in sugar syrup',
    price: 199,
    image: 'https://images.pexels.com/photos/15014919/pexels-photo-15014919.jpeg',
  },
  {
    id: 11,
    category: 'desserts',
    name: 'Rasmalai',
    description: 'Soft cottage cheese patties in saffron-flavored milk, garnished with pistachios and almonds',
    price: 249,
    image: 'https://images.pexels.com/photos/16067818/pexels-photo-16067818.jpeg',
  },

  // Beverages
  {
    id: 12,
    category: 'beverages',
    name: 'Masala Chai',
    description: 'Indian spiced tea with milk',
    price: 79,
    image: 'https://images.pexels.com/photos/5946975/pexels-photo-5946975.jpeg',
  },
  {
    id: 13,
    category: 'beverages',
    name: 'Lassi',
    description: 'Traditional yogurt-based sweet or salted drink',
    price: 129,
    image: 'https://content.jdmagicbox.com/v2/comp/bangalore/f4/080pxx80.xx80.180222215608.e3f4/catalogue/lassi-counter-jp-nagar-bangalore-lassi-shops-nlcd9ln4i1.jpg',
  },
  {
    id: 14,
    category: 'beverages',
    name: 'Fresh Lime Soda',
    description: 'Refreshing lime-based drink, sweet or salted',
    price: 99,
    image: 'https://images.pexels.com/photos/2775860/pexels-photo-2775860.jpeg',
  }
];

const Menu = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { cartItems, addToCart } = useCart();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleCategoryToggle = (category) => {
    const currentIndex = selectedCategories.indexOf(category);
    const newSelectedCategories = [...selectedCategories];

    if (currentIndex === -1) {
      newSelectedCategories.push(category);
    } else {
      newSelectedCategories.splice(currentIndex, 1);
    }

    setSelectedCategories(newSelectedCategories);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    setSnackbarOpen(true);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'starters':
        return <Restaurant />;
      case 'main':
        return <LocalDining />;
      case 'breads':
        return <Flatware />;
      case 'beverages':
        return <LocalBar />;
      case 'desserts':
        return <Cake />;
      default:
        return <Restaurant />;
    }
  };

  const filterItems = () => {
    return menuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);
      const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  };

  const drawerContent = (
    <Box sx={{ width: isMobile ? '100%' : 250, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">
          Filters
        </Typography>
        {isMobile && (
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search dishes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Categories
      </Typography>
      <List>
        {['starters', 'main', 'breads', 'desserts', 'beverages'].map((category) => (
          <ListItem
            key={category}
            dense
            button
            onClick={() => handleCategoryToggle(category)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={selectedCategories.includes(category)}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemIcon sx={{ minWidth: 40 }}>
              {getCategoryIcon(category)}
            </ListItemIcon>
            <ListItemText 
              primary={category.charAt(0).toUpperCase() + category.slice(1)} 
              sx={{ ml: -2 }}
            />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" gutterBottom>
        Price Range
      </Typography>
      <Box sx={{ px: 2 }}>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
          step={50}
          valueLabelFormat={value => formatPrice(value)}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2">{formatPrice(priceRange[0])}</Typography>
          <Typography variant="body2">{formatPrice(priceRange[1])}</Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh',
      position: 'relative',
      bgcolor: '#000000',
    }}>
      <Drawer
        variant="temporary"
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          },
          '& .MuiDrawer-paper': {
            width: isMobile ? '100%' : '300px',
            maxWidth: '100%',
            height: '100%',
            boxSizing: 'border-box',
            bgcolor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            backdropFilter: 'blur(8px)',
            borderRight: '1px solid rgba(212, 175, 55, 0.2)',
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#D4AF37',
              fontFamily: 'serif',
              fontWeight: 600,
              mb: 3,
            }}
          >
            Filter Menu
          </Typography>
          {drawerContent}
        </Box>
      </Drawer>

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
          <IconButton
            sx={{
              mr: 2,
              color: '#D4AF37',
              '&:hover': {
                transform: 'scale(1.1)',
                transition: 'transform 0.2s',
              },
            }}
            onClick={() => setDrawerOpen(true)}
          >
            <FilterList />
          </IconButton>
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

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          pt: { xs: 8, sm: 9 },
          px: { xs: 2, sm: 3 },
          pb: { xs: 2, sm: 3 },
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          minHeight: '100vh',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1667030986194-1ede16810993?fm=jpg&q=80&w=3000")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            opacity: 0.15,
            zIndex: -1,
            '@media (max-width: 600px)': {
              backgroundAttachment: 'scroll',
            }
          },
        }}
      >
        <Container maxWidth="xl" sx={{ mt: { xs: 2, sm: 4 }, position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            align="center" 
            sx={{ 
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              mb: { xs: 3, sm: 4 },
              color: '#D4AF37',
              fontFamily: 'serif',
              fontWeight: 600,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            Our Menu
          </Typography>

          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {filterItems().map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 4px 20px rgba(212, 175, 55, 0.25)',
                    },
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: '0 2px 10px rgba(212, 175, 55, 0.15)',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(212, 175, 55, 0.1)',
                  }}
                >
                  <CardMedia
                    component="img"
                    height={isSmall ? 160 : 200}
                    image={item.image}
                    alt={item.name}
                    sx={{ 
                      objectFit: 'cover',
                      borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                    <Typography 
                      gutterBottom 
                      variant="h5" 
                      component="h2"
                      sx={{ 
                        fontSize: { xs: '1.25rem', sm: '1.5rem' },
                        mb: 1,
                        fontFamily: 'serif',
                        fontWeight: 600,
                        color: '#D4AF37',
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        mb: 2,
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        color: 'rgba(255, 255, 255, 0.7)',
                      }}
                    >
                      {item.description}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontSize: { xs: '1.1rem', sm: '1.25rem' },
                        fontWeight: 600,
                        fontFamily: 'serif',
                        color: '#D4AF37',
                      }}
                    >
                      {formatPrice(item.price)}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ p: { xs: 2, sm: 3 }, pt: 0 }}>
                    <Button 
                      variant="contained" 
                      size={isSmall ? "medium" : "large"}
                      fullWidth
                      startIcon={<AddShoppingCart />}
                      onClick={() => handleAddToCart(item)}
                      sx={{
                        borderRadius: 2,
                        py: { xs: 1, sm: 1.5 },
                        textTransform: 'none',
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        background: 'linear-gradient(45deg, #D4AF37 30%, #FFD700 90%)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #FFD700 30%, #D4AF37 90%)',
                        }
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Item added to cart"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            bgcolor: 'rgba(0, 0, 0, 0.9)',
            color: '#D4AF37',
          }
        }}
      />
    </Box>
  );
};

export default Menu;
