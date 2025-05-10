import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HomeIcon, ShoppingBagIcon, LogOutIcon } from 'lucide-react';

const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const sidebarItems = [
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
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="hidden sm:flex w-64 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] flex-col"
    >
      <div className="flex-1 py-6 flex flex-col">
        <nav className="flex-1 px-4 space-y-2">
          {sidebarItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === item.path
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOutIcon size={20} className="mr-3" />
          Se déconnecter
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;