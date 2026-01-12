'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Pencil, Trash2, MapPin, X, Check } from 'lucide-react';
import { useSuspenseQuery } from '@tanstack/react-query';
import queryFactories from '@/entities/api/queryFactories';
import { FavoriteLocation } from '../model/useFavorites';

export default function FavoriteCard({
  favorite,
  onRemove,
  onUpdateAlias,
}: {
  favorite: FavoriteLocation;
  onRemove: (id: string) => void;
  onUpdateAlias: (id: string, alias: string) => void;
}) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [alias, setAlias] = useState(favorite.alias);

  // Fetch minimal weather data for the card
  const { data: weather } = useSuspenseQuery(
    queryFactories.getCurrentWeatherQueryOptions({
      lat: favorite.lat,
      lon: favorite.lon,
    })
  );

  const handleClick = () => {
    if (!isEditing) {
      router.push(
        `/?lat=${favorite.lat}&lon=${favorite.lon}&region=${encodeURIComponent(
          favorite.alias
        )}`
      );
    }
  };

  const handleSaveAlias = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateAlias(favorite.id, alias);
    setIsEditing(false);
  };

  const handleCancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAlias(favorite.alias);
    setIsEditing(false);
  };

  return (
    <Card
      className='p-4! group relative h-full bg-white/10 hover:bg-white/15 border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-md shadow-lg hover:shadow-xl hover:-translate-y-1'
      onClick={handleClick}
    >
      <div className='absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none' />

      <Button
        size='icon'
        variant='ghost'
        className={`absolute top-2 right-2 h-8 w-8 transition-opacity text-red-400 hover:text-red-300 hover:bg-red-400/10 z-20 ${
          isEditing
            ? 'opacity-0 pointer-events-none'
            : 'opacity-100 md:opacity-0 md:group-hover:opacity-100'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onRemove(favorite.id);
        }}
      >
        <Trash2 className='h-4 w-4' />
      </Button>

      <CardContent className='p-6 flex flex-col justify-between h-full relative z-10'>
        <div className='flex justify-between items-start mb-2'>
          <div className='flex-1 pr-8 gap-2 flex flex-col'>
            {isEditing ? (
              <div
                className='flex items-center'
                onClick={(e) => e.stopPropagation()}
              >
                <Input
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                  className='h-8 bg-white/10 border-white/20 text-white'
                  autoFocus
                />
                <Button
                  size='icon'
                  variant='ghost'
                  className='h-8 w-8 text-green-400 hover:text-green-300'
                  onClick={handleSaveAlias}
                >
                  <Check className='h-4 w-4' />
                </Button>
                <Button
                  size='icon'
                  variant='ghost'
                  className='h-8 w-8 text-red-400 hover:text-red-300'
                  onClick={handleCancelEdit}
                >
                  <X className='h-4 w-4' />
                </Button>
              </div>
            ) : (
              <div className='flex items-center gap-2'>
                <h3 className='font-bold text-white'>{favorite.alias}</h3>
                <Button
                  size='icon'
                  variant='ghost'
                  className='h-6 w-6 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity text-white/50 hover:text-white'
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                >
                  <Pencil className='h-3 w-3' />
                </Button>
              </div>
            )}
            <p className='text-xs text-white/50 flex items-center gap-1 mt-1'>
              <MapPin className='h-3 w-3' />
              {favorite.name}
            </p>
          </div>
        </div>

        <div className='flex items-end justify-between mt-6 pt-4 border-t border-white/10'>
          <div className='flex flex-col'>
            <span className='text-xs text-white/40 font-medium tracking-wider uppercase mb-1'>
              Now
            </span>
            <div className='flex items-baseline gap-1'>
              <span className='text-4xl font-bold text-white tracking-tighter'>
                {Math.round(weather.main.temp)}
              </span>
              <span className='text-lg text-white/50 font-light'>°</span>
            </div>
          </div>

          <div className='flex flex-col items-end gap-1'>
            <span className='text-xs text-white/60 capitalize bg-white/10 px-2 py-0.5 rounded-full'>
              {weather.weather[0].description}
            </span>
            <div className='text-right flex items-center gap-3 text-sm font-medium mt-1'>
              <span className='text-red-300'>
                H: {Math.round(weather.main.temp_max)}°
              </span>
              <span className='text-blue-300'>
                L: {Math.round(weather.main.temp_min)}°
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
