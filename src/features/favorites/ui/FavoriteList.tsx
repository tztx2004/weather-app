'use client';

import { useFavorites } from '../model/useFavorites';
import FavoriteCard from './FavoriteCard';
import { Plus } from 'lucide-react';

export default function FavoriteList() {
  const { favorites, removeFavorite, updateAlias } = useFavorites();

  if (favorites.length === 0) {
    return null;
  }

  return (
    <div className='w-full max-w-xl animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200 flex flex-col gap-6'>
      <div className='flex items-center gap-3 mb-6 px-2'>
        <div className='h-8 w-1 bg-linear-to-b from-blue-400 to-purple-400 rounded-full shadow-[0_0_10px_rgba(96,165,250,0.5)]' />
        <h3 className='text-2xl font-bold text-white tracking-tight flex items-baseline gap-2'>
          즐겨찾는 장소
          <span className='text-sm font-medium text-white/40'>
            {favorites.length} / 6
          </span>
        </h3>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5'>
        {favorites.map((fav, index) => (
          <div
            key={fav.id}
            className='p-2 animate-in zoom-in-50 fade-in fill-mode-forwards'
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <FavoriteCard
              favorite={fav}
              onRemove={removeFavorite}
              onUpdateAlias={updateAlias}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
