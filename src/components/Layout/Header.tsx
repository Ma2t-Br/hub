import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-16 bg-white shadow-sm border-b border-gray-200 px-4 flex items-center justify-between"
    >
      <h1 className="text-2xl font-semibold text-blue-600">HUB</h1>
      
      {user && (
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-700 hidden sm:block">
            Bienvenue, {user.name}
          </div>
          <img
            src={user.avatar}
            alt={user.name}
            className="h-8 w-8 rounded-full object-cover border border-gray-200"
          />
        </div>
      )}
    </motion.header>
  );
};

export default Header;