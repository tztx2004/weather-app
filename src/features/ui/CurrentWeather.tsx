'use client';

import {
  MapPin,
  Star,
  Thermometer,
  ThermometerSun,
  ThermometerSnowflake,
} from 'lucide-react';
import { Card, CardContent } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { getRegionName } from '@/entities/api/groq';
import { useEffect, useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import queryFactories from '@/entities/api/queryFactories';

export default function CurrentWeather({
  lat,
  lon,
  region,
}: {
  lat: string;
  lon: string;
  region?: string;
}) {
  const { data: currentWeatherData } = useSuspenseQuery(
    queryFactories.getCurrentWeatherQueryOptions({ lat, lon })
  );

  const [regionName, setRegionName] = useState<string>(region || '');

  useEffect(() => {
    if (region) {
      setRegionName(region);
      return;
    }

    async function fetchRegionName() {
      const result = await getRegionName({ lat, lon });
      if (result && result.city) {
        setRegionName(result.city);
      }
    }
    fetchRegionName();
  }, [lat, lon, region]);

  return (
    <Card className='p-4! overflow-hidden bg-white/10 border-white/20 backdrop-blur-xl shadow-2xl w-full max-w-xl hover:bg-white/15 transition-colors animate-in zoom-in-95 fade-in duration-700 delay-150 fill-mode-forwards'>
      <CardContent className='p-8 flex flex-col gap-4'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <MapPin className='h-5 w-5 text-white!' />
            <div>
              <h2 className='text-2xl font-bold text-white tracking-wide'>
                {regionName || currentWeatherData.name}
              </h2>
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

        <div className='mt-10 grid grid-cols-3 gap-4'>
          <div className='flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 p-5! hover:bg-white/10 transition-colors'>
            <Thermometer className='h-6 w-6 text-blue-400' />
            <div>
              <p className='text-xs text-blue-200/60 uppercase tracking-wider font-semibold'>
                현재 기온
              </p>
              <p className='font-bold text-white text-xl'>
                {currentWeatherData.main.temp}
                <span className='text-sm font-normal text-white/50'>°C</span>
              </p>
            </div>
          </div>
          <div className='flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 p-5! hover:bg-white/10 transition-colors'>
            <ThermometerSun className='h-6 w-6 text-red-400' />
            <div>
              <p className='text-xs text-blue-200/60 uppercase tracking-wider font-semibold'>
                최고 기온
              </p>
              <p className='font-bold text-white text-xl'>
                {currentWeatherData.main.temp_max}{' '}
                <span className='text-sm font-normal text-white/50'>°C</span>
              </p>
            </div>
          </div>
          <div className='flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 p-5! hover:bg-white/10 transition-colors'>
            <ThermometerSnowflake className='h-6 w-6 text-blue-400' />
            <div>
              <p className='text-xs text-blue-200/60 uppercase tracking-wider font-semibold'>
                최저 기온
              </p>
              <p className='font-bold text-white text-xl'>
                {currentWeatherData.main.temp_min}{' '}
                <span className='text-sm font-normal text-white/50'>°C</span>
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
