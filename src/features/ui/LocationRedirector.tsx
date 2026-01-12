'use client';

import useCurrentPosition from '@/entities/model/useCurrentPosition';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function LocationRedirector() {
  const position = useCurrentPosition();
  const router = useRouter();

  useEffect(() => {
    if (position) {
      router.replace(`/?lat=${position.latitude}&lon=${position.longitude}`);
    }
  }, [position, router]);

  return (
    <div className='flex flex-col items-center justify-center min-h-[50vh] gap-4'>
      <Loader2 className='h-8 w-8 animate-spin text-white/70' />
      <p className='text-white/70 font-medium'>현재 위치를 찾는 중입니다...</p>
    </div>
  );
}
