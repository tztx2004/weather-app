import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Missing coordinates' }, { status: 400 });
  }

  const baseUrl = process.env.CURRENT_SERVER_URL;
  const apiKey = process.env.SERVER_API_KEY;

  if (!baseUrl || !apiKey) {
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }

  const url = `${baseUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`;

  try {
    const response = await fetch(url, { cache: 'no-store' });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch weather' },
      { status: 500 }
    );
  }
}
