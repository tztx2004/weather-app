'use client';

import { useEffect, useState } from 'react';

export default function useCurrentPosition() {
  const [position, setPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setPosition({ latitude, longitude });
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  }, []);

  return position;
}
