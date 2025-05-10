import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

// Define user type
interface User {
  id: string;
  name: string;
  pseudo: string;
  email: string;
  avatar: string | null;
  library: string[]; // Liste des IDs des items achetés
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
  addToLibrary: (itemId: string) => Promise<void>;
  removeFromLibrary: (itemId: string) => Promise<void>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  isLoading: false,
  error: null,
  addToLibrary: async () => {},
  removeFromLibrary: async () => {}
});

// Hook for using the auth context
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

// Fonction pour générer un avatar par défaut basé sur le nom
const generateDefaultAvatar = (name: string): string => {
  const encodedName = encodeURIComponent(name);
  // Utilisation de DiceBear avec le style 'bottts' qui génère des avatars de robots aléatoires
  // Utilisation d'une couleur de fond fixe valide
  return `https://api.dicebear.com/7.x/bottts/svg?seed=${encodedName}&backgroundColor=ffdfbf`;
};

// Fonction pour valider et formater l'URL de l'avatar
const formatAvatarUrl = (url: string | null, name: string): string => {
  if (!url) {
    return generateDefaultAvatar(name);
  }

  // Vérifier si l'URL est valide
  try {
    new URL(url);
    return url;
  } catch {
    // Si l'URL n'est pas valide, retourner l'avatar par défaut
    return generateDefaultAvatar(name);
  }
};

// Provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour ajouter un item à la bibliothèque
  const addToLibrary = async (itemId: string) => {
    if (!user) return;

    try {
      const userRef = doc(db, 'users', user.id);
      const newLibrary = [...user.library, itemId];
      
      await setDoc(userRef, { library: newLibrary }, { merge: true });
      setUser({ ...user, library: newLibrary });
    } catch (err) {
      console.error('Erreur lors de l\'ajout à la bibliothèque:', err);
      setError('Erreur lors de l\'ajout à la bibliothèque');
    }
  };

  // Fonction pour retirer un item de la bibliothèque
  const removeFromLibrary = async (itemId: string) => {
    if (!user) return;

    try {
      const userRef = doc(db, 'users', user.id);
      const newLibrary = user.library.filter(id => id !== itemId);
      
      await setDoc(userRef, { library: newLibrary }, { merge: true });
      setUser({ ...user, library: newLibrary });
    } catch (err) {
      console.error('Erreur lors de la suppression de la bibliothèque:', err);
      setError('Erreur lors de la suppression de la bibliothèque');
    }
  };

  // Fonction pour créer ou mettre à jour le document utilisateur
  const createOrUpdateUserDoc = async (firebaseUser: FirebaseUser) => {
    const userRef = doc(db, 'users', firebaseUser.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      // Créer un nouveau document utilisateur
      const defaultName = firebaseUser.displayName || 'Nouvel utilisateur';
      const userData = {
        name: defaultName,
        pseudo: defaultName,
        email: firebaseUser.email,
        avatar: formatAvatarUrl(firebaseUser.photoURL, defaultName),
        library: [],
        createdAt: new Date().toISOString()
      };
      
      console.log('Création du document utilisateur avec les données:', userData);
      await setDoc(userRef, userData);
    }

    // Récupérer les données mises à jour
    const updatedDoc = await getDoc(userRef);
    const userData = updatedDoc.data();
    console.log('Données utilisateur récupérées:', userData);
    
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email!,
      name: userData?.name || 'Nouvel utilisateur',
      pseudo: userData?.pseudo || 'Nouvel utilisateur',
      avatar: formatAvatarUrl(userData?.avatar || null, userData?.name || 'Nouvel utilisateur'),
      library: userData?.library || []
    };
  };

  // Check for saved auth on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await createOrUpdateUserDoc(firebaseUser);
          setUser(userData);
        } catch (err) {
          console.error('Erreur lors de la récupération des données utilisateur:', err);
          setError('Erreur lors de la récupération des données utilisateur');
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userData = await createOrUpdateUserDoc(userCredential.user);
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    }
  };

  const value = {
    user,
    login,
    logout,
    isLoading,
    error,
    addToLibrary,
    removeFromLibrary
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};