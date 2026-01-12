'use server';

import Groq from 'groq-sdk';

export async function groqRequest({ location }: { location: string }) {
  const chatCompletion = await getGroqChatCompletion({ location });
  const content = chatCompletion.choices[0]?.message?.content || '{}';
  try {
    const data = JSON.parse(content);
    return data;
  } catch (error) {
    console.error('Failed to parse Groq response:', error);
    return null;
  }
}

export async function getGroqChatCompletion({
  location,
}: {
  location: string;
}) {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  return groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          '너는 위도와 경도를 알려주는 시스템이야. JSON 형식으로만 대답해. key는 "city", "lat", "lon" 이어야 해.',
      },
      {
        role: 'user',
        content: `${location}의 위도와 경도를 알려줘`,
      },
    ],
    model: 'openai/gpt-oss-20b',
    response_format: { type: 'json_object' },
  });
}

export async function getRegionName({
  lat,
  lon,
}: {
  lat: string;
  lon: string;
}) {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          '너는 좌표를 주소로 변환해주는 지오코딩 시스템이야. 정확도가 가장 중요해. JSON 형식으로만 대답해. key는 "city" 하나여야 하고, 값은 "경기도 성남시 분당구" 또는 "서울특별시 강남구" 같은 시/군/구 단위까지의 정확한 한국어 행정구역 명칭이어야 해.',
      },
      {
        role: 'user',
        content: `위도: ${lat}, 경도: ${lon} 의 주소를 알려줘`,
      },
    ],
    model: 'openai/gpt-oss-20b',
    response_format: { type: 'json_object' },
  });

  const content = chatCompletion.choices[0]?.message?.content || '{}';
  try {
    return JSON.parse(content);
  } catch (error) {
    console.error('Failed to parse Groq response:', error);
    return null;
  }
}
