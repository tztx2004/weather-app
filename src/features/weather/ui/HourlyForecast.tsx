'use client';

import queryFactories from '@/entities/api/queryFactories';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { useSuspenseQuery } from '@tanstack/react-query';
import {
  ChevronLeft,
  ChevronRight,
  Thermometer,
  ThermometerSun,
  ThermometerSnowflake,
  Clock,
} from 'lucide-react';
import { useRef } from 'react';

export function HourlyForecast({ lat, lon }: { lat: string; lon: string }) {
  const { data: hourlyWeatherData } = useSuspenseQuery(
    queryFactories.getHourlyWeatherQueryOptions({ lat, lon })
  );

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

  return (
    <Card className='p-4! border-border max-w-xl bg-white/10 backdrop-blur-xl shadow-2xl w-full'>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <div className='flex items-center gap-2'>
          <Clock className='h-5 w-5 text-blue-300' />
          <CardTitle className='text-lg font-semibold text-white'>
            시간대별 날씨
          </CardTitle>
        </div>
        <div className='flex gap-1'>
          <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8 text-white/70 hover:bg-white/10 hover:text-white'
            onClick={() => scroll('left')}
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8 text-white/70 hover:bg-white/10 hover:text-white'
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
          {hourlyWeatherData.list.map((hour: any, index: number) => (
            <div
              key={index}
              className='flex flex-col items-center justify-between gap-3 p-4! min-w-[140px] rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors'
            >
              <span className='text-sm font-medium text-blue-100/80 mb-2'>
                {new Date(hour.dt_txt).toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  hour12: false,
                })}
              </span>

              <div className='flex flex-col gap-2 w-full'>
                <div className='flex items-center justify-between gap-2'>
                  <div className='flex items-center gap-1.5'>
                    <Thermometer className='h-3.5 w-3.5 text-blue-300' />
                    <span className='text-xs text-blue-200/70'>현재</span>
                  </div>
                  <span className='text-sm font-bold text-white'>
                    {Math.round(hour.main.temp)}°
                  </span>
                </div>

                <div className='flex items-center justify-between gap-2'>
                  <div className='flex items-center gap-1.5'>
                    <ThermometerSun className='h-3.5 w-3.5 text-red-300' />
                    <span className='text-xs text-blue-200/70'>최고</span>
                  </div>
                  <span className='text-sm font-bold text-white'>
                    {Math.round(hour.main.temp_max)}°
                  </span>
                </div>

                <div className='flex items-center justify-between gap-2'>
                  <div className='flex items-center gap-1.5'>
                    <ThermometerSnowflake className='h-3.5 w-3.5 text-blue-300' />
                    <span className='text-xs text-blue-200/70'>최저</span>
                  </div>
                  <span className='text-sm font-bold text-white'>
                    {Math.round(hour.main.temp_min)}°
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
