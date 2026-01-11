'use client';

import { useWeather } from '@/entities/model/weatherContext';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import weatherIcons from '@/shared/ui/weatherIcon';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

export function HourlyForecast() {
  const { hourlyWeather, currentLocation } = useWeather();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!currentLocation || hourlyWeather.length === 0) {
    return null;
  }

  return (
    <Card className='bg-card border-border'>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-lg font-semibold text-card-foreground'>
          시간대별 날씨
        </CardTitle>
        <div className='flex gap-1'>
          <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8'
            onClick={() => scroll('left')}
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8'
            onClick={() => scroll('right')}
          >
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div
          ref={scrollRef}
          className='flex gap-4 overflow-x-auto pb-2 scrollbar-hide'
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {hourlyWeather.map((hour, index) => (
            <div
              key={index}
              className='flex flex-shrink-0 flex-col items-center gap-2 rounded-lg bg-secondary px-4 py-3 min-w-[70px]'
            >
              <span className='text-sm text-muted-foreground'>{hour.time}</span>
              <span className='text-2xl'>
                {weatherIcons[hour.icon] || '☁️'}
              </span>
              <span className='font-semibold text-secondary-foreground'>
                {hour.temp}°
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
