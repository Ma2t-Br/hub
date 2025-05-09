import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCartIcon, StarIcon, TagIcon } from 'lucide-react';

const marketplaceItems = [
  {
    id: '1',
    name: 'Premium Analytics',
    description: 'Advanced analytics with custom reports and dashboards',
    price: '€49.99/month',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Analytics',
    rating: 4.8
  },
  {
    id: '2',
    name: 'Security Suite Pro',
    description: 'Complete security solution with advanced threat protection',
    price: '€79.99/month',
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Security',
    rating: 4.9
  },
  {
    id: '3',
    name: 'DevOps Toolkit',
    description: 'Streamline your development workflow with our integrated tools',
    price: '€59.99/month',
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Development',
    rating: 4.7
  },
  {
    id: '4',
    name: 'Cloud Storage Plus',
    description: 'Expanded storage solution with advanced features',
    price: '€39.99/month',
    image: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Storage',
    rating: 4.6
  }
];

const Marketplace: React.FC = () => {
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {marketplaceItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="aspect-video overflow-hidden bg-gray-200">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
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
                  className="flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg"
                >
                  <ShoppingCartIcon size={16} className="mr-1" />
                  Ajouter
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;