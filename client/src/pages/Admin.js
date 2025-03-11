import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  Tabs, 
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip
} from '@mui/material';
import { 
  PersonOutline, 
  ShoppingCartOutlined 
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

// TabPanel component for tab content
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Admin = () => {
  const { currentUser, isAuthenticated, isAdmin } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  
  // Redirect to login if not authenticated or not admin
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Mock data for users
  const users = [
    { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin' },
    { id: 2, name: 'Regular User', email: 'user@example.com', role: 'user' },
    { id: 3, name: 'John Smith', email: 'john@example.com', role: 'user' },
    { id: 4, name: 'Sarah Connor', email: 'sarah@example.com', role: 'user' }
  ];
  
  // Mock data for orders
  const orders = [
    { 
      id: 'ORD-001', 
      user: 'Sarah Connor', 
      date: '2023-05-15', 
      items: ['Cheeseburger', 'French Fries', 'Coke'],
      total: 18.99,
      status: 'Delivered'
    },
    { 
      id: 'ORD-002', 
      user: 'John Smith',
      date: '2023-05-14', 
      items: ['Chicken Wings', 'Garlic Bread', 'Beer'],
      total: 22.50,
      status: 'Processing'
    },
    { 
      id: 'ORD-003', 
      user: 'Regular User',
      date: '2023-05-13', 
      items: ['Pizza', 'Salad', 'Water'],
      total: 15.75,
      status: 'Delivered'
    },
    { 
      id: 'ORD-004', 
      user: 'Sarah Connor',
      date: '2023-05-12', 
      items: ['Steak', 'Mashed Potatoes', 'Wine'],
      total: 42.99,
      status: 'Delivered'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Admin Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Welcome back, {currentUser.name}
          </Typography>
        </Box>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="admin tabs">
            <Tab icon={<PersonOutline />} label="Users" id="admin-tab-0" />
            <Tab icon={<ShoppingCartOutlined />} label="Orders" id="admin-tab-1" />
          </Tabs>
        </Box>
        
        <TabPanel value={tabValue} index={0}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip 
                        label={user.role.toUpperCase()} 
                        color={user.role === 'admin' ? 'secondary' : 'default'} 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Button size="small" color="primary">Edit</Button>
                      <Button size="small" color="error">Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Items</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.user}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.items.join(', ')}</TableCell>
                    <TableCell>₹{order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Chip 
                        label={order.status} 
                        color={order.status === 'Delivered' ? 'success' : 'warning'} 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Button size="small" color="primary">View</Button>
                      <Button size="small" color="secondary">Update</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default Admin;