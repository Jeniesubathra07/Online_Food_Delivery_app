const express = require('express');
const router = express.Router();
const { 
  createOrder,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderStatus
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);

// User routes
router.post('/', createOrder);
router.get('/myorders', getMyOrders);
router.get('/:id', getOrderById);

// Admin only routes
router.get('/', admin, getOrders);
router.put('/:id/status', admin, updateOrderStatus);

module.exports = router;