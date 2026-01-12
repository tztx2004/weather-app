import { queryOptions } from '@tanstack/react-query';

const CURRENT_BASE_URL = `${process.env.CURRENT_SERVER_URL}?appid=${process.env.SERVER_API_KEY}&units=metric&lang=kr`;

const HOURLY_BASE_URL = `${process.env.HOURLY_SERVER_URL}?appid=${process.env.SERVER_API_KEY}&units=metric&lang=kr`;

const queryFactories = {
  all: ['weather'],

  getCurrentWeatherQueryKey: ['currentWeather'],
  getHourlyWeatherQueryKey: ['hourlyWeather'],

  getCurrentWeatherQueryOptions: ({ lat, lon }: { lat: string; lon: string }) =>
    queryOptions({
      queryKey: [
        ...queryFactories.all,
        ...queryFactories.getCurrentWeatherQueryKey,
      ],
      queryFn: async () => {
        const response = await fetch(
          `${CURRENT_BASE_URL}&lat=${lat}&lon=${lon}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            cache: 'no-store',
          }
        );

        return response.json();
      },
    }),

  getHourlyWeatherQueryOptions: ({ lat, lon }: { lat: string; lon: string }) =>
    queryOptions({
      queryKey: [
        ...queryFactories.all,
        ...queryFactories.getHourlyWeatherQueryKey,
      ],
      queryFn: async () => {
        const response = await fetch(
          `${HOURLY_BASE_URL}&lat=${lat}&lon=${lon}&cnt=24`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            cache: 'no-store',
          }
        );

        return response.json();
      },
    }),
};

export default queryFactories;
