import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trash2Icon } from 'lucide-react';

interface CardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string | undefined;
  onRemove?: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ id, title, description, image, link, onRemove }) => {
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove?.(id);
  };

  return (
    <motion.div
      whileHover={{ 
        scale: 1.03,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      }}
      transition={{ duration: 0.2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow relative"
    >
      {onRemove && (
        <button
          onClick={handleRemove}
          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors z-10"
          title="Retirer du hub"
        >
          <Trash2Icon size={16} />
        </button>
      )}
      <Link to={link? link : ""} className="block h-full">
        <div className="aspect-video overflow-hidden bg-gray-200">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;