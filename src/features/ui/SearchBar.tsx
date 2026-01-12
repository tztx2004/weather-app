'use client';

import { Search, MapPin, Star, X } from 'lucide-react';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';

import { cn } from '@/lib/utils';
import { groqRequest } from '@/entities/api/groq';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import koreaDistricts from '../../../korea_districts.json';

export default function SearchBar() {
  const [location, setLocation] = useState<string>('');
  const [results, setResults] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);

    if (value.length > 0) {
      const filtered = koreaDistricts.filter((district: string) =>
        district.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered.slice(0, 50)); // Limit results for performance
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleSelect = async (selectedLocation: string) => {
    setLocation(selectedLocation);
    setIsOpen(false);
    // Optional: Trigger search immediately
    try {
      const data = await groqRequest({ location: selectedLocation });
      if (data && data.lat && data.lon) {
        router.push(
          `/?lat=${data.lat}&lon=${data.lon}&region=${encodeURIComponent(
            selectedLocation
          )}`
        );
      } else {
        console.error('Invalid data received from Groq after selection:', data);
      }
    } catch (error) {
      console.error('Search failed after selection:', error);
    }
  };

  const onKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      try {
        const data = await groqRequest({ location });
        if (data && data.lat && data.lon) {
          router.push(
            `/?lat=${data.lat}&lon=${data.lon}&region=${encodeURIComponent(
              data.city || location
            )}`
          );
        } else {
          console.error('Invalid data received from Groq:', data);
        }
      } catch (error) {
        console.error('Search failed:', error);
      }
    }
  };

  return (
    <div className='relative w-full max-w-xl group animate-in slide-in-from-top-4 fade-in duration-700'>
      <div className='relative transition-transform duration-300 ease-out group-hover:scale-[1.02]'>
        <Search className='absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60 pointer-events-none' />
        <Input
          type='text'
          placeholder='Search city...'
          value={location}
          onChange={handleInputChange}
          onKeyDown={onKeyDown}
          onFocus={() => {
            if (location.length > 0) setIsOpen(true);
          }}
          onBlur={() => {
            // Delay hiding to allow click event to register
            setTimeout(() => setIsOpen(false), 200);
          }}
          className='pl-12 pr-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-2xl backdrop-blur-md shadow-lg focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:border-transparent transition-all'
        />
        {location && (
          <Button
            variant='ghost'
            size='icon'
            className='absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 text-white/50 hover:text-white'
            onClick={() => {
              setLocation('');
              setResults([]);
              setIsOpen(false);
            }}
          >
            <X className='h-4 w-4' />
          </Button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className='absolute z-50 mt-2 w-full rounded-lg border border-white/10 bg-black/60 shadow-lg backdrop-blur-md overflow-hidden'>
          <ul className='max-h-64 overflow-auto py-2 custom-scrollbar'>
            {results.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleSelect(item)}
                  className='flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-white/10 transition-colors'
                >
                  <MapPin className='h-4 w-4 text-blue-300' />
                  <span className='font-medium text-white/90'>{item}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
