const express = require('express');
const router = express.Router();
const { 
  getMenuItems, 
  getMenuItemById, 
  createMenuItem, 
  updateMenuItem, 
  deleteMenuItem,
  getMenuItemsByCategory
} = require('../controllers/menuController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getMenuItems);
router.get('/category/:category', getMenuItemsByCategory);
router.get('/:id', getMenuItemById);

// Admin only routes
router.post('/', protect, admin, createMenuItem);
router.put('/:id', protect, admin, updateMenuItem);
router.delete('/:id', protect, admin, deleteMenuItem);

module.exports = router;