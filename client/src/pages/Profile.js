import React from 'react';
import { Navigate } from 'react-router-dom';
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  Avatar, 
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip
} from '@mui/material';
import { Person, Man, Woman, Logout } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Mock order history data
  const orderHistory = [
    { 
      id: 'ORD-001', 
      date: '2023-05-15', 
      items: ['Cheeseburger', 'French Fries', 'Coke'],
      total: 18.99,
      status: 'Delivered'
    },
    { 
      id: 'ORD-002', 
      date: '2023-05-07', 
      items: ['Chicken Wings', 'Garlic Bread', 'Beer'],
      total: 22.50,
      status: 'Delivered'
    }
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Avatar 
            sx={{ 
              width: 100, 
              height: 100, 
              bgcolor: 'primary.main',
              mb: 2
            }}
          >
            {currentUser.gender === 'female' ? <Woman sx={{ fontSize: 60 }} /> : <Man sx={{ fontSize: 60 }} />}
          </Avatar>
          <Typography variant="h4" gutterBottom>
            {currentUser.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {currentUser.email}
          </Typography>
          <Typography variant="body2" color="primary" gutterBottom>
            {currentUser.role === 'admin' ? 'Administrator' : 'Customer'}
          </Typography>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Box>
          <Typography variant="h5" gutterBottom>
            Order History
          </Typography>
          
          {orderHistory.length > 0 ? (
            <List>
              {orderHistory.map((order) => (
                <Paper key={order.id} elevation={2} sx={{ mb: 2, p: 2 }}>
                  <ListItem alignItems="flex-start" sx={{ flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Order #{order.id}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {order.date}
                      </Typography>
                    </Box>
                    
                    <ListItemText 
                      primary={order.items.join(', ')}
                      secondary={
                        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" component="span" color="text.primary">
                            Status: {order.status}
                          </Typography>
                          <Typography variant="body1" component="span" fontWeight="bold">
                            ₹{order.total.toFixed(2)}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                </Paper>
              ))}
            </List>
          ) : (
            <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
              No orders yet
            </Typography>
          )}
        </Box>
      </Paper>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Tooltip title="Logout">
          <IconButton 
            onClick={logout} 
            color="primary" 
            size="large"
            sx={{ 
              bgcolor: 'background.paper', 
              boxShadow: 2,
              '&:hover': { bgcolor: 'background.paper', boxShadow: 3 }
            }}
          >
            <Logout />
          </IconButton>
        </Tooltip>
      </Box>
    </Container>
  );
};

export default Profile;