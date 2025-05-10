import React from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoginForm from '../components/Auth/LoginForm';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const { user } = useAuth();

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/hub/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-blue-600 mb-2">HUB</h1>
        <p className="text-gray-600">Centre de contrôle centralisé</p>
      </motion.div>
      
      <LoginForm />
    </div>
  );
};

export default Login;