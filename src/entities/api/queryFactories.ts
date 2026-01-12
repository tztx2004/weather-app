import { queryOptions } from '@tanstack/react-query';

// 클라이언트에서는 상대 경로를 사용하고, 서버에서는 환경 변수를 사용하도록 처리
const isServer = typeof window === 'undefined';

const queryFactories = {
  all: ['weather'],

  getCurrentWeatherQueryKey: ['currentWeather'],
  getHourlyWeatherQueryKey: ['hourlyWeather'],

  getCurrentWeatherQueryOptions: ({ lat, lon }: { lat: string; lon: string }) =>
    queryOptions({
      queryKey: [
        ...queryFactories.all,
        ...queryFactories.getCurrentWeatherQueryKey,
        lat,
        lon,
      ],
      queryFn: async () => {
        let url;

        if (isServer) {
          // 서버 사이드 prefetch 시에는 직접 OpenWeatherMap 호출
          url = `${process.env.CURRENT_SERVER_URL}?appid=${process.env.SERVER_API_KEY}&units=metric&lang=kr&lat=${lat}&lon=${lon}`;
        } else {
          // 클라이언트 사이드 fetch 시에는 우리가 만든 API Route 호출
          url = `/api/weather/current?lat=${lat}&lon=${lon}`;
        }

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error('Weather fetching failed');
        }

        return response.json();
      },
    }),

  getHourlyWeatherQueryOptions: ({ lat, lon }: { lat: string; lon: string }) =>
    queryOptions({
      queryKey: [
        ...queryFactories.all,
        ...queryFactories.getHourlyWeatherQueryKey,
        lat,
        lon,
      ],
      queryFn: async () => {
        let url;

        if (isServer) {
          url = `${process.env.HOURLY_SERVER_URL}?appid=${process.env.SERVER_API_KEY}&units=metric&lang=kr&lat=${lat}&lon=${lon}&cnt=24`;
        } else {
          url = `/api/weather/hourly?lat=${lat}&lon=${lon}`;
        }

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error('Hourly forecast fetching failed');
        }

        return response.json();
      },
    }),
};

export default queryFactories;
