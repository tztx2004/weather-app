'use client';

import { Cloud, Droplets, Wind, MapPin, Star, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';

import { useWeather } from '@/entities/model/weatherContext';

export default function CurrentWeather() {
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

  return (
    <Card className='p-4! overflow-hidden bg-white/10 border-white/20 backdrop-blur-xl shadow-2xl w-full max-w-xl hover:bg-white/15 transition-colors duration-500 animate-in zoom-in-95 fade-in duration-700 delay-150 fill-mode-forwards'>
      <CardContent className='p-8'>
        <div className='flex items-start justify-between'>
          <div className='flex items-center gap-2'>
            <MapPin className='h-5 w-5 text-blue-300' />
            <div>
              <h2 className='text-2xl font-bold text-white tracking-wide'>
                {currentLocation?.name}
              </h2>
              <p className='text-sm text-blue-200/70 font-medium'>
                {currentLocation?.fullAddress}
              </p>
            </div>
          </div>
          <Button
            variant='ghost'
            size='icon'
            // onClick={() => addFavorite(currentLocation)}
            // disabled={isFavorite as boolean}
            className='hover:bg-white/10 text-white/70 hover:text-white'
          >
            <Star className={'h-6 w-6 transition-all'} />
          </Button>
        </div>

        <div className='mt-10 flex items-center justify-between'>
          <div className='flex items-center gap-6'>
            <span className='text-8xl drop-shadow-lg filter'>
              {/* {weatherIcons[currentWeather?.icon] || '☁️'} */}
            </span>
            <div>
              <p className='text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70 tracking-tighter'>
                {currentWeather?.temp}°
              </p>
              <p className='text-xl text-blue-100/80 font-medium capitalize mt-1'>
                {currentWeather?.description}
              </p>
            </div>
          </div>

          <div className='text-right space-y-1'>
            <p className='text-sm text-blue-200/60 font-medium'>
              High{' '}
              <span className='font-bold text-white text-lg ml-1'>
                {currentWeather?.tempMax}°
              </span>
            </p>
            <p className='text-sm text-blue-200/60 font-medium'>
              Low{' '}
              <span className='font-bold text-white text-lg ml-1'>
                {currentWeather?.tempMin}°
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
                {currentWeather?.humidity}%
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
                {currentWeather?.windSpeed}{' '}
                <span className='text-sm font-normal text-white/50'>m/s</span>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
