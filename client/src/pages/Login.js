import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Alert,
  Divider 
} from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const result = login(email, password);
    
    if (result.success) {
      // Redirect based on role
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      setError(result.message);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <LoginIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Divider sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?
              </Typography>
            </Divider>
            <Button 
              component={Link} 
              to="/register" 
              variant="outlined" 
              fullWidth
            >
              Create Account
            </Button>
          </Box>
          
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3 }}>
            Demo accounts:<br/>
            Admin: admin@example.com / admin123<br/>
            User: user@example.com / user123
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;