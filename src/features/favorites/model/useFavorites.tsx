'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

export interface FavoriteLocation {
  id: string; // Unique ID (e.g., lat,lon string)
  lat: string;
  lon: string;
  name: string; // Real location name
  alias: string; // User-defined alias (initially same as name)
}

const MAX_FAVORITES = 6;
const STORAGE_KEY = 'weather-app-favorites';

interface FavoritesContextType {
  favorites: FavoriteLocation[];
  addFavorite: (location: { lat: string; lon: string; name: string }) => void;
  removeFavorite: (id: string) => void;
  updateAlias: (id: string, newAlias: string) => void;
  isFavorite: (lat: string, lon: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteLocation[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse favorites', e);
      }
    }
  }, []);

  const saveToStorage = (newFavorites: FavoriteLocation[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  const addFavorite = (location: {
    lat: string;
    lon: string;
    name: string;
  }) => {
    if (favorites.length >= MAX_FAVORITES) {
      alert(`최대 ${MAX_FAVORITES}개까지만 저장할 수 있습니다.`);
      return;
    }

    const id = `${location.lat},${location.lon}`;
    if (favorites.some((fav) => fav.id === id)) {
      alert('이미 저장된 장소입니다.');
      return;
    }

    const newFavorite: FavoriteLocation = {
      id,
      lat: location.lat,
      lon: location.lon,
      name: location.name,
      alias: location.name,
    };

    saveToStorage([...favorites, newFavorite]);
  };

  const removeFavorite = (id: string) => {
    const newFavorites = favorites.filter((fav) => fav.id !== id);
    saveToStorage(newFavorites);
  };

  const updateAlias = (id: string, newAlias: string) => {
    const newFavorites = favorites.map((fav) =>
      fav.id === id ? { ...fav, alias: newAlias } : fav
    );
    saveToStorage(newFavorites);
  };

  const isFavorite = (lat: string, lon: string) => {
    const id = `${lat},${lon}`;
    return favorites.some((fav) => fav.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        updateAlias,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
