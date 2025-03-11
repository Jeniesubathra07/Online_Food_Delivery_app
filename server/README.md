# MoMA Restaurant API

Backend API for MoMA Restaurant application providing endpoints for authentication, menu items, and order management.

## API Endpoints

### Authentication

- **Register**: `POST /api/auth/register`
  - Body: `{ name, email, password }`
  - Returns: User data and auth token

- **Login**: `POST /api/auth/login`
  - Body: `{ email, password }`
  - Returns: User data and auth token

- **Get Profile**: `GET /api/auth/profile`
  - Header: `Authorization: Bearer [token]`
  - Returns: User profile data

### Menu Items

- **Get All Menu Items**: `GET /api/menu`
  - Public access
  - Returns: Array of all menu items

- **Get Menu Item by ID**: `GET /api/menu/:id`
  - Public access
  - Returns: Single menu item data

- **Get Menu Items by Category**: `GET /api/menu/category/:category`
  - Public access
  - Categories: 'appetizer', 'main', 'dessert', 'drink'
  - Returns: Array of menu items in the specified category

- **Create Menu Item**: `POST /api/menu`
  - Admin only
  - Header: `Authorization: Bearer [token]`
  - Body: `{ name, description, price, image, category }`
  - Returns: Created menu item data

- **Update Menu Item**: `PUT /api/menu/:id`
  - Admin only
  - Header: `Authorization: Bearer [token]`
  - Body: `{ name, description, price, image, category, available }`
  - Returns: Updated menu item data

- **Delete Menu Item**: `DELETE /api/menu/:id`
  - Admin only
  - Header: `Authorization: Bearer [token]`
  - Returns: Success message

### Orders

- **Create Order**: `POST /api/orders`
  - Authenticated users
  - Header: `Authorization: Bearer [token]`
  - Body: `{ items: [{ menuItem, name, price, quantity }], totalAmount }`
  - Returns: Created order data

- **Get My Orders**: `GET /api/orders/myorders`
  - Authenticated users
  - Header: `Authorization: Bearer [token]`
  - Returns: Array of user's orders

- **Get Order by ID**: `GET /api/orders/:id`
  - Authenticated users (own orders or admin)
  - Header: `Authorization: Bearer [token]`
  - Returns: Single order data

- **Get All Orders**: `GET /api/orders`
  - Admin only
  - Header: `Authorization: Bearer [token]`
  - Returns: Array of all orders

- **Update Order Status**: `PUT /api/orders/:id/status`
  - Admin only
  - Header: `Authorization: Bearer [token]`
  - Body: `{ status }`
  - Status options: 'pending', 'processing', 'completed', 'cancelled'
  - Returns: Updated order data

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/moma_restaurant
   JWT_SECRET=your_jwt_secret
   ```

3. Start the server:
   ```
   npm start
   ```

## Note about Route Order

For the menu routes, be careful with the order of the routes. The specific route for categories `/api/menu/category/:category` should be placed before the route for menu item by ID `/api/menu/:id` to ensure proper routing.