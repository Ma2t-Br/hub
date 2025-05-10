import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCartIcon, StarIcon, TagIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getItems } from '../data/items';
import type { CardItem } from '../data/items';
import { useAuth } from '../context/AuthContext';

const Marketplace: React.FC = () => {
  const [marketplaceItems, setItems] = useState<CardItem[]>([]);
  const { user, addToLibrary } = useAuth();

  useEffect(() => {
    const loadItems = async () => {
      const data = await getItems();
      setItems(data);
    };
    loadItems();
  }, []);

  const handleAddToLibrary = async (e: React.MouseEvent, itemId: string) => {
    e.preventDefault();
    e.stopPropagation();
    await addToLibrary(itemId);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-[calc(100vh-4rem)] overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800">Marketplace</h2>
        <p className="text-gray-600">Découvrez et achetez des services supplémentaires pour votre hub</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {marketplaceItems.map((item, index) => (
          <Link to={`/hub/service/${item.id}`} key={item.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="aspect-video overflow-hidden bg-gray-200">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <div className="flex items-center text-yellow-500">
                    <StarIcon size={16} className="fill-current" />
                    <span className="ml-1 text-sm font-medium">{item.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center mb-3">
                  <TagIcon size={16} className="text-blue-500" />
                  <span className="ml-2 text-sm text-blue-600">{item.category}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">{item.price}</span>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => handleAddToLibrary(e, item.id)}
                    disabled={user?.library.includes(item.id)}
                    className={`flex items-center px-3 py-1.5 ${
                      user?.library.includes(item.id)
                        ? 'bg-green-600'
                        : 'bg-blue-600'
                    } text-white text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <ShoppingCartIcon size={16} className="mr-1" />
                    {user?.library.includes(item.id) ? 'Abonné' : "S'abonner"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;