import CurrentWeather from '@/features/weather/ui/CurrentWeather';
import SearchBar from '@/features/weather/ui/SearchBar';

import { HourlyForecast } from '@/features/weather/ui/HourlyForecast';
import LocationRedirector from '@/features/weather/ui/LocationRedirector';
import FavoriteList from '@/features/favorites/ui/FavoriteList';
import { FavoritesProvider } from '@/entities/model/useFavorites';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/app/layouts/get-query-client';
import queryFactories from '@/entities/api/queryFactories';

export default async function HomePage(props: {
  searchParams: { lat: string; lon: string; region?: string };
}) {
  const queryClient = getQueryClient();

  const searchParams = await props.searchParams;

  if (!searchParams.lat || !searchParams.lon) {
    return (
      <main className='min-h-screen flex flex-col items-center justify-center p-6 gap-8 w-full max-w-4xl mx-auto'>
        <h1 className='text-4xl md:text-5xl font-extrabold tracking-tight text-center bg-linear-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-sm'>
          Korea Weather Now
        </h1>
        <LocationRedirector />
      </main>
    );
  }

  await Promise.all([
    // 현재기온
    queryClient.prefetchQuery(
      queryFactories.getCurrentWeatherQueryOptions({
        lat: searchParams.lat,
        lon: searchParams.lon,
      })
    ),

    // 시간대별 기온
    queryClient.prefetchQuery(
      queryFactories.getHourlyWeatherQueryOptions({
        lat: searchParams.lat,
        lon: searchParams.lon,
      })
    ),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className='min-h-screen flex flex-col items-center justify-center p-6 gap-8 w-full max-w-4xl mx-auto'>
        <h1 className='text-4xl md:text-5xl font-extrabold tracking-tight text-center bg-linear-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-sm'>
          Korea Weather Now
        </h1>
        <div className='w-full flex flex-col items-center gap-6'>
          <FavoritesProvider>
            <SearchBar />
            <CurrentWeather
              lat={searchParams.lat}
              lon={searchParams.lon}
              region={searchParams.region}
            />
            <HourlyForecast lat={searchParams.lat} lon={searchParams.lon} />
            <FavoriteList />
          </FavoritesProvider>
        </div>
      </main>
    </HydrationBoundary>
  );
}
