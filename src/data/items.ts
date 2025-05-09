import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface CardItem {
    id: string;
    title: string;
    description: string;
    image: string;
    link: string;
    rating: number;
    category: string;
    price: string;
    detailedDescription?: string;
    screenshots?: string[];
    features?: string[];
    webAppUrl?: string;
  }

export const getItems = async (): Promise<CardItem[]> => {
  try {
    console.log('Tentative de récupération des items...');
    const itemsCollection = collection(db, 'items');
    
    const itemsSnapshot = await getDocs(itemsCollection);
    console.log('Nombre de documents récupérés:', itemsSnapshot.size);
    
    if (itemsSnapshot.empty) {
      console.log('Aucun document trouvé dans la collection items');
      return [];
    }

    const items: CardItem[] = itemsSnapshot.docs.map(doc => {
      const data = doc.data();
      console.log('Document data:', data);
      return {
        id: doc.id,
        title: data.title || '',
        description: data.description || '',
        image: data.image || '',
        link: data.link || '',
        rating: data.rating || 0,
        category: data.category || '',
        price: data.price || 'No price',
        detailedDescription: data.detailedDescription || '',
        screenshots: data.screenshots || [],
        features: data.features || [],
        webAppUrl: data.webAppUrl || ''
      };
    });

    return items;
  } catch (error) {
    console.error('Erreur détaillée:', error);
    if (error instanceof Error) {
      console.error('Message d\'erreur:', error.message);
      console.error('Stack trace:', error.stack);
    }
    throw error;
  }
}; 