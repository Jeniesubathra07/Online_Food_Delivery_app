import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock user data for demonstration
  const mockUsers = [
    { id: 1, email: 'admin@example.com', password: 'admin123', name: 'Admin User', role: 'admin', gender: 'male' },
    { id: 2, email: 'user@example.com', password: 'user123', name: 'Regular User', role: 'user', gender: 'male' }
  ];

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock authentication logic
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
      // Remove password before storing user
      const { password, ...secureUser } = user;
      setCurrentUser(secureUser);
      localStorage.setItem('currentUser', JSON.stringify(secureUser));
      return { success: true, user: secureUser };
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const register = (name, email, password, gender) => {
    // Check if email already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return { success: false, message: 'Email already in use' };
    }

    // Create new user with 'user' role by default
    const newUser = {
      id: mockUsers.length + 1,
      email,
      password,
      name,
      role: 'user',
      gender: gender || 'male'
    };

    // Add to mock users (in a real app, this would be an API call)
    mockUsers.push(newUser);
    
    // Remove password before storing user
    const { password: pwd, ...secureUser } = newUser;
    setCurrentUser(secureUser);
    localStorage.setItem('currentUser', JSON.stringify(secureUser));
    
    return { success: true, user: secureUser };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    isAdmin: currentUser?.role === 'admin',
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};