const MenuItem = require('../models/MenuItem');

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
exports.getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({});
    res.json(menuItems);
  } catch (error) {
    console.error('Get menu items error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get menu item by ID
// @route   GET /api/menu/:id
// @access  Public
exports.getMenuItemById = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    
    if (menuItem) {
      res.json(menuItem);
    } else {
      res.status(404).json({ message: 'Menu item not found' });
    }
  } catch (error) {
    console.error('Get menu item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a menu item
// @route   POST /api/menu
// @access  Private/Admin
exports.createMenuItem = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
    
    const menuItem = new MenuItem({
      name,
      description,
      price,
      image,
      category
    });
    
    const createdItem = await menuItem.save();
    res.status(201).json(createdItem);
  } catch (error) {
    console.error('Create menu item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a menu item
// @route   PUT /api/menu/:id
// @access  Private/Admin
exports.updateMenuItem = async (req, res) => {
  try {
    const { name, description, price, image, category, available } = req.body;
    
    const menuItem = await MenuItem.findById(req.params.id);
    
    if (menuItem) {
      menuItem.name = name || menuItem.name;
      menuItem.description = description || menuItem.description;
      menuItem.price = price || menuItem.price;
      menuItem.image = image || menuItem.image;
      menuItem.category = category || menuItem.category;
      menuItem.available = available !== undefined ? available : menuItem.available;
      
      const updatedItem = await menuItem.save();
      res.json(updatedItem);
    } else {
      res.status(404).json({ message: 'Menu item not found' });
    }
  } catch (error) {
    console.error('Update menu item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a menu item
// @route   DELETE /api/menu/:id
// @access  Private/Admin
exports.deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    
    if (menuItem) {
      await menuItem.remove();
      res.json({ message: 'Menu item removed' });
    } else {
      res.status(404).json({ message: 'Menu item not found' });
    }
  } catch (error) {
    console.error('Delete menu item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get menu items by category
// @route   GET /api/menu/category/:category
// @access  Public
exports.getMenuItemsByCategory = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ category: req.params.category });
    res.json(menuItems);
  } catch (error) {
    console.error('Get menu items by category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};