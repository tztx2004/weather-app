// import { CurrentWeather } from '@/features/ui/CurrentWeather-ai';
import CurrentWeather from '@/features/ui/CurrentWeather';
import SearchBar from '@/features/ui/SearchBar';
import { WeatherProvider } from '@/entities/model/weatherContext';
import { HourlyForecast } from '@/features/ui/HourlyForecast';

export default function HomePage() {
  return (
    <WeatherProvider>
      <main className='min-h-screen flex flex-col items-center justify-center p-6 gap-8 w-full max-w-4xl mx-auto'>
        <h1 className='text-4xl md:text-5xl font-extrabold tracking-tight text-center bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-sm'>
          Weather Now
        </h1>
        <div className='w-full flex flex-col items-center gap-6'>
          <SearchBar />
          <CurrentWeather />
          <HourlyForecast />
        </div>
      </main>
    </WeatherProvider>
  );
}
