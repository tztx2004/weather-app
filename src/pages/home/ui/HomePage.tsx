// import { CurrentWeather } from '@/features/ui/CurrentWeather-ai';
import CurrentWeather from '@/features/ui/CurrentWeather';
import SearchBar from '@/features/ui/SearchBar';
import { WeatherProvider } from '@/entities/model/weatherContext';
import { HourlyForecast } from '@/features/ui/HourlyForecast';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/app/layouts/get-query-client';
import queryFactories from '@/entities/api/queryFactories';

export default async function HomePage(props: {
  searchParams: { lat: string; lon: string };
}) {
  const queryClient = getQueryClient();

  const searchParams = await props.searchParams;

  await Promise.all([
    // 현재기온
    queryClient.prefetchQuery(
      queryFactories.getCurrentWeatherQueryOptions({
        lat: searchParams.lat,
        lon: searchParams.lon,
      })
    ),

    // 시간대별 기온
    queryClient.prefetchQuery(queryFactories.getHourlyWeatherQueryOptions()),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WeatherProvider>
        <main className='min-h-screen flex flex-col items-center justify-center p-6 gap-8 w-full max-w-4xl mx-auto'>
          <h1 className='text-4xl md:text-5xl font-extrabold tracking-tight text-center bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-sm'>
            Korea Weather Now
          </h1>
          <div className='w-full flex flex-col items-center gap-6'>
            <SearchBar />
            <CurrentWeather lat={searchParams.lat} lon={searchParams.lon} />
            <HourlyForecast />
          </div>
        </main>
      </WeatherProvider>
    </HydrationBoundary>
  );
}
