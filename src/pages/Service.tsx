import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { getItems } from '../data/items';
import type { CardItem } from '../data/items';

const Service: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<CardItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [screenshots, setScreenshots] = useState<string[]>([]);

  useEffect(() => {
    const loadItem = async () => {
      const items = await getItems();
      const foundItem = items.find(i => i.id === id);
      if (foundItem) {
        setItem(foundItem);
        setScreenshots([
          foundItem.image,
          ...(foundItem.screenshots || [])
        ]);
      }
    };
    loadItem();
  }, [id]);

  if (!item) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">Chargement...</p>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* En-tête avec navigation */}
        <div className="mb-8">
          <Link to="/marketplace" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ChevronLeftIcon size={20} className="mr-1" />
            Retour à la marketplace
          </Link>
        </div>

        {/* Section principale */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Carrousel d'images */}
          <div className="relative aspect-video bg-gray-100">
            <img
              src={screenshots[currentImageIndex]}
              alt={`Screenshot ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
              <ChevronLeftIcon size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
              <ChevronRightIcon size={24} />
            </button>
          </div>

          {/* Informations du service */}
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
                <div className="flex items-center text-yellow-500 mb-4">
                  <StarIcon size={20} className="fill-current" />
                  <span className="ml-1 text-lg font-medium">{item.rating}</span>
                </div>
              </div>
            </div>

            {/* Description détaillée */}
            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed">{item.detailedDescription ? item.detailedDescription : item.description}</p>
              
              {/* Caractéristiques supplémentaires */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Fonctionnalités</h3>
                  <ul className="space-y-2">
                    {item.features && item.features.length > 0 ? (
                      item.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500 italic">Aucune fonctionnalité spécifiée</li>
                    )}
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Catégorie</h3>
                    {item.category ? (
                      <p className="text-gray-600">{item.category}</p>
                    ) : (
                      <p className="text-gray-500 italic">Aucune Catégorie spécifiée</p>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service; 