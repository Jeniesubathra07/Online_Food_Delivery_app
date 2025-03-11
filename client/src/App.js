import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import PaymentSuccess from './pages/PaymentSuccess';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#D4AF37', // Metallic gold
      light: '#FFD700', // Brighter gold
      dark: '#B8860B', // Darker gold
    },
    secondary: {
      main: '#C0C0C0', // Silver
      light: '#E0E0E0',
      dark: '#A0A0A0',
    },
    background: {
      default: '#000000',
      paper: '#121212',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    action: {
      hover: 'rgba(212, 175, 55, 0.1)', // Golden hover effect
    },
  },
  typography: {
    h1: {
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    h2: {
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.05em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          background: 'linear-gradient(45deg, #D4AF37 30%, #FFD700 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #B8860B 30%, #D4AF37 90%)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(to right, #000000, #121212)',
          boxShadow: '0 4px 12px rgba(212, 175, 55, 0.15)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          '&:hover': {
            boxShadow: '0 6px 16px rgba(212, 175, 55, 0.2)',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Protected Routes - require authentication */}
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
              </Route>
              
              {/* Admin Routes - require admin role */}
              <Route element={<ProtectedRoute requireAdmin={true} />}>
                <Route path="/admin" element={<Admin />} />
              </Route>
            </Routes>
          </Router>
        </ThemeProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
