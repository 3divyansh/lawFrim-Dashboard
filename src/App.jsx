import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './Component/Layout/Layout.jsx';
import Home from './Pages/Home/Home.jsx';
import Blog from './Pages/Blog/Blog.jsx';
import AdminLogin from './Pages/Admin/AdminLogin.jsx';

const App = () => {
const [isAuthenticated, setIsAuthenticated] = useState(
  localStorage.getItem('isAuthenticated') === 'true'
);

const handleLoginSuccess = () => {
  setIsAuthenticated(true);
  localStorage.setItem('isAuthenticated', 'true');
};

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/admin-login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin-login" element={<AdminLogin onLoginSuccess={handleLoginSuccess} />} />

        <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
          <Route index element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="*" element={<p>Page Not Found</p>} />
        </Route>

        <Route path="*" element={<p>Page Not Found</p>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
