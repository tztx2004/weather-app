'use client';

import { useEffect } from 'react';
import { Cloud, Droplets, Wind, MapPin, Star, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { useWeather } from '@/entities/model/weatherContext';
import { cn } from '@/lib/utils';

const weatherIcons: Record<string, string> = {
  '01d': '☀️',
  '01n': '🌙',
  '02d': '⛅',
  '02n': '☁️',
  '03d': '☁️',
  '03n': '☁️',
  '04d': '☁️',
  '04n': '☁️',
  '09d': '🌧️',
  '09n': '🌧️',
  '10d': '🌦️',
  '10n': '🌧️',
  '11d': '⛈️',
  '11n': '⛈️',
  '13d': '❄️',
  '13n': '❄️',
  '50d': '🌫️',
  '50n': '🌫️',
};

const DEFAULT_LOCATION = {
  id: 'default-seoul',
  name: '서울특별시',
  fullAddress: '서울특별시',
  lat: 37.5665,
  lon: 126.978,
};

export function CurrentWeather() {
  const {
    currentLocation,
    setCurrentLocation,
    currentWeather,
    setCurrentWeather,
    setHourlyWeather,
    favorites,
    addFavorite,
    isLoading,
    setIsLoading,
    error,
    setError,
  } = useWeather();

  const loadDefaultWeather = () => {
    setCurrentLocation(DEFAULT_LOCATION);
    setCurrentWeather({
      temp: 18,
      tempMin: 12,
      tempMax: 22,
      description: '맑음',
      icon: '01d',
      humidity: 65,
      windSpeed: 3.5,
    });
    setHourlyWeather(
      Array.from({ length: 24 }, (_, i) => ({
        time: `${i.toString().padStart(2, '0')}:00`,
        temp: Math.round(12 + Math.sin((i / 24) * Math.PI * 2) * 5 + 5),
        icon: i >= 6 && i <= 18 ? '01d' : '01n',
      }))
    );
  };

  useEffect(() => {
    if (!currentLocation) {
      setIsLoading(true);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const mockLocation = {
              id: 'current',
              name: '현재 위치',
              fullAddress: '서울특별시 강남구',
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            };
            setCurrentLocation(mockLocation);
            setCurrentWeather({
              temp: 18,
              tempMin: 12,
              tempMax: 22,
              description: '맑음',
              icon: '01d',
              humidity: 65,
              windSpeed: 3.5,
            });
            setHourlyWeather(
              Array.from({ length: 24 }, (_, i) => ({
                time: `${i.toString().padStart(2, '0')}:00`,
                temp: Math.round(12 + Math.sin((i / 24) * Math.PI * 2) * 5 + 5),
                icon: i >= 6 && i <= 18 ? '01d' : '01n',
              }))
            );
            setIsLoading(false);
          },
          () => {
            loadDefaultWeather();
            setIsLoading(false);
          }
        );
      } else {
        loadDefaultWeather();
        setIsLoading(false);
      }
    }
  }, []);

  const isFavorite =
    currentLocation && favorites.some((f) => f.id === currentLocation.id);

  if (isLoading) {
    return (
      <Card className='bg-white/5 border-white/10 backdrop-blur-md shadow-2xl w-full max-w-xl'>
        <CardContent className='flex h-80 items-center justify-center'>
          <Loader2 className='h-10 w-10 animate-spin text-blue-300' />
        </CardContent>
      </Card>
    );
  }

  if (error && !currentWeather) {
    return (
      <Card className='bg-white/5 border-white/10 backdrop-blur-md shadow-2xl w-full max-w-xl'>
        <CardContent className='flex h-80 flex-col items-center justify-center gap-4 p-8'>
          <Cloud className='h-16 w-16 text-white/30' />
          <p className='text-center text-lg text-white/60'>{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!currentLocation || !currentWeather) {
    return (
      <Card className='bg-white/5 border-white/10 backdrop-blur-md shadow-2xl w-full max-w-xl'>
        <CardContent className='flex h-80 flex-col items-center justify-center gap-6'>
          <MapPin className='h-16 w-16 text-white/20' />
          <p className='text-center text-xl text-white/60 font-light'>
            Search for a city to see the weather
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='overflow-hidden bg-white/10 border-white/20 backdrop-blur-xl shadow-2xl w-full max-w-xl hover:bg-white/15 transition-colors duration-500 animate-in zoom-in-95 fade-in duration-700 delay-150 fill-mode-forwards'>
      <CardContent className='p-8'>
        <div className='flex items-start justify-between'>
          <div className='flex items-center gap-2'>
            <MapPin className='h-5 w-5 text-blue-300' />
            <div>
              <h2 className='text-2xl font-bold text-white tracking-wide'>
                {currentLocation.name}
              </h2>
              <p className='text-sm text-blue-200/70 font-medium'>
                {currentLocation.fullAddress}
              </p>
            </div>
          </div>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => addFavorite(currentLocation)}
            disabled={isFavorite as boolean}
            className='hover:bg-white/10 text-white/70 hover:text-white'
          >
            <Star
              className={cn(
                'h-6 w-6 transition-all',
                isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-white/40'
              )}
            />
          </Button>
        </div>

        <div className='mt-10 flex items-center justify-between'>
          <div className='flex items-center gap-6'>
            <span className='text-8xl drop-shadow-lg filter'>
              {weatherIcons[currentWeather.icon] || '☁️'}
            </span>
            <div>
              <p className='text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70 tracking-tighter'>
                {currentWeather.temp}°
              </p>
              <p className='text-xl text-blue-100/80 font-medium capitalize mt-1'>
                {currentWeather.description}
              </p>
            </div>
          </div>

          <div className='text-right space-y-1'>
            <p className='text-sm text-blue-200/60 font-medium'>
              High{' '}
              <span className='font-bold text-white text-lg ml-1'>
                {currentWeather.tempMax}°
              </span>
            </p>
            <p className='text-sm text-blue-200/60 font-medium'>
              Low{' '}
              <span className='font-bold text-white text-lg ml-1'>
                {currentWeather.tempMin}°
              </span>
            </p>
          </div>
        </div>

        <div className='mt-10 grid grid-cols-2 gap-4'>
          <div className='flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 p-5 hover:bg-white/10 transition-colors'>
            <Droplets className='h-6 w-6 text-blue-400' />
            <div>
              <p className='text-xs text-blue-200/60 uppercase tracking-wider font-semibold'>
                Humidity
              </p>
              <p className='font-bold text-white text-xl'>
                {currentWeather.humidity}%
              </p>
            </div>
          </div>
          <div className='flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 p-5 hover:bg-white/10 transition-colors'>
            <Wind className='h-6 w-6 text-blue-400' />
            <div>
              <p className='text-xs text-blue-200/60 uppercase tracking-wider font-semibold'>
                Wind Speed
              </p>
              <p className='font-bold text-white text-xl'>
                {currentWeather.windSpeed}{' '}
                <span className='text-sm font-normal text-white/50'>m/s</span>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
