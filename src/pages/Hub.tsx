import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Cards/Card';
import { getItems } from '../data/items';
import type { CardItem } from '../data/items';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Hub: React.FC = () => {
  const [items, setItems] = useState<CardItem[]>([]);

  useEffect(() => {
    const loadItems = async () => {
      const data = await getItems();
      setItems(data);
    };
    loadItems();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-[calc(100vh-4rem)] overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800">Centre de contrôle</h2>
        <p className="text-gray-600">Accédez à tous vos services depuis un emplacement central</p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {items.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            image={item.image}
            link={item.link}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Hub;