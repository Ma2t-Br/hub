import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Utils/ProtectedRoute';
import Login from './pages/Login';
import Hub from './pages/Hub';
import Marketplace from './pages/Marketplace';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/hub" element={<Hub />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/service/:id" element={
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800">Service Page</h2>
                <p className="text-gray-600 mt-2">Cette page est un exemple et serait développée dans une version future.</p>
              </div>
            } />
          </Route>
          
          {/* Redirect to login or hub based on auth status */}
          <Route path="*" element={<Navigate to="/hub" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;