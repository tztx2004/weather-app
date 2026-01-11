'use client';

import { Search, MapPin, Star, X } from 'lucide-react';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';

import { cn } from '@/lib/utils';

export default function SearchBar() {
  return (
    <div className='relative w-full max-w-xl group animate-in slide-in-from-top-4 fade-in duration-700'>
      <div className='relative transition-transform duration-300 ease-out group-hover:scale-[1.02]'>
        <Search className='absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60 pointer-events-none' />
        <Input
          type='text'
          placeholder='Search city...'
          // value={query}
          // onChange={(e) => setQuery(e.target.value)}
          className='pl-12 pr-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-2xl backdrop-blur-md shadow-lg focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:border-transparent transition-all'
        />
        {/* {query && (
          <Button
            variant='ghost'
            size='icon'
            className='absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6'
            onClick={() => setQuery('')}
          >
            <X className='h-4 w-4' />
          </Button>
        )} */}
      </div>

      {/* {isOpen && (
        <div
          ref={dropdownRef}
          className='absolute z-50 mt-2 w-full rounded-lg border border-border bg-card shadow-lg'
        >
          {results.length > 0 ? (
            <ul className='max-h-64 overflow-auto py-2'>
              {results.map((location) => (
                <li key={location.id}>
                  <button
                    onClick={() => handleSelect(location)}
                    className='flex w-full items-center justify-between px-4 py-3 text-left hover:bg-secondary transition-colors'
                  >
                    <div className='flex items-center gap-3'>
                      <MapPin className='h-4 w-4 text-muted-foreground' />
                      <div>
                        <p className='font-medium text-card-foreground'>
                          {location.name}
                        </p>
                        <p className='text-sm text-muted-foreground'>
                          {location.fullAddress}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-8 w-8'
                      onClick={(e) => {
                        e.stopPropagation();
                        addFavorite(location);
                      }}
                    >
                      <Star
                        className={cn(
                          'h-4 w-4',
                          isFavorite(location.id)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-muted-foreground'
                        )}
                      />
                    </Button>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className='px-4 py-8 text-center text-muted-foreground'>
              검색 결과가 없습니다
            </div>
          )}
        </div>
      )} */}
    </div>
  );
}
