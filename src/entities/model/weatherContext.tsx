'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';

export interface Location {
  id: string;
  name: string;
  fullAddress: string;
  lat: number;
  lon: number;
}

export interface WeatherData {
  temp: number;
  tempMin: number;
  tempMax: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export interface HourlyWeather {
  time: string;
  temp: number;
  icon: string;
}

export interface FavoriteLocation extends Location {
  alias?: string;
  weather?: WeatherData;
}

interface WeatherContextType {
  currentLocation: Location | null;
  setCurrentLocation: (location: Location | null) => void;
  currentWeather: WeatherData | null;
  setCurrentWeather: (weather: WeatherData | null) => void;
  hourlyWeather: HourlyWeather[];
  setHourlyWeather: (weather: HourlyWeather[]) => void;
  favorites: FavoriteLocation[];
  addFavorite: (location: Location) => void;
  removeFavorite: (id: string) => void;
  updateFavoriteAlias: (id: string, alias: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(
    null
  );
  const [hourlyWeather, setHourlyWeather] = useState<HourlyWeather[]>([]);
  const [favorites, setFavorites] = useState<FavoriteLocation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('weather-favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // Save favorites to localStorage when changed
  useEffect(() => {
    localStorage.setItem('weather-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (location: Location) => {
    if (favorites.length >= 6) {
      setError('즐겨찾기는 최대 6개까지 추가할 수 있습니다.');
      return;
    }
    if (favorites.some((f) => f.id === location.id)) {
      setError('이미 즐겨찾기에 추가된 장소입니다.');
      return;
    }
    setFavorites((prev) => [...prev, { ...location }]);
    setError(null);
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  };

  const updateFavoriteAlias = (id: string, alias: string) => {
    setFavorites((prev) =>
      prev.map((f) => (f.id === id ? { ...f, alias } : f))
    );
  };

  return (
    <WeatherContext.Provider
      value={{
        currentLocation,
        setCurrentLocation,
        currentWeather,
        setCurrentWeather,
        hourlyWeather,
        setHourlyWeather,
        favorites,
        addFavorite,
        removeFavorite,
        updateFavoriteAlias,
        isLoading,
        setIsLoading,
        error,
        setError,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
}
