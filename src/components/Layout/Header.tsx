import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HomeIcon, ShoppingBagIcon, LogOutIcon } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      name: 'Centre de contrôle',
      path: '/hub/',
      icon: <HomeIcon size={20} />,
    },
    {
      name: 'Marketplace',
      path: '/marketplace',
      icon: <ShoppingBagIcon size={20} />,
    },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-16 bg-white shadow-sm border-b border-gray-200 px-4 flex items-center justify-between relative"
    >
      <h1 className="text-2xl font-semibold text-blue-600">HUB</h1>
      
      {/* Menu hamburger pour mobile */}
      <button 
        title=""
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="sm:hidden p-2"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span className={`w-full h-0.5 bg-gray-600 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-full h-0.5 bg-gray-600 transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-full h-0.5 bg-gray-600 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </div>
      </button>

      {/* Menu desktop */}
      <div className="hidden sm:flex items-center space-x-4">
        {user && (
          <>
            <div className="text-sm text-gray-700">
              Hey, {user.name}
            </div>
            <img
              src={user.avatar ?? '/default-avatar.png'}
              alt={user.name}
              className="h-8 w-8 rounded-full object-cover border border-gray-200"
            />
          </>
        )}
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg sm:hidden"
          >
            <div className="px-4 py-3 space-y-3">
              {user && (
                <>
                  <div className="flex items-center space-x-3">
                    <img
                      src={user.avatar ?? '/default-avatar.png'}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover border border-gray-200"
                    />
                    <div className="text-sm text-gray-700">
                      Hey, {user.name}
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    {menuItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          location.pathname === item.path
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.name}
                      </Link>
                    ))}
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOutIcon size={20} className="mr-3" />
                      Se déconnecter
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;