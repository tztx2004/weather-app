'use client';

import { getRegionName } from '@/entities/api/groq';
import { useFavorites } from '@/entities/model/useFavorites';
import { useEffect, useState } from 'react';

export default function useCurrentWeather({
  lat,
  lon,
  region,
  currentWeatherName,
}: {
  lat: string;
  lon: string;
  region?: string;
  currentWeatherName: string;
}) {
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

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(lat, lon);

  const handleToggleFavorite = () => {
    const id = `${lat},${lon}`;
    if (isFav) {
      removeFavorite(id);
    } else {
      addFavorite({
        lat,
        lon,
        name: regionName || currentWeatherName,
      });
    }
  };

  return {
    regionName,
    handleToggleFavorite,
    isFav,
  };
}
