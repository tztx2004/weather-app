# 🌦️ Korea Weather Now

**Korea Weather Now**는 대한민국 행정구역에 최적화된 최신 기술 스택 기반의 고성능 날씨 웹 어플리케이션입니다. Groq LLM을 활용한 고도로 정밀한 한글 지오코딩과 프리미엄 글래스모피즘 UI/UX를 특징으로 합니다.

## 🚀 주요 기능

- **지역 검색**: 국내 행정구역 데이터베이스를 기반으로 한 자동 완성 검색 기능을 제공합니다.
- **실시간 날씨 정보**: 현재 기온, 최고/최저 기온을 직관적인 디자인으로 제공합니다.
- **시간대별 예보**: 향후 24시간 동안의 기온 추이를 가로 스크롤 형태의 카드로 시각화합니다.
- **즐겨찾기 시스템**: 자주 찾는 장소를 최대 6개까지 저장하고, 사용자 지정 별칭(Alias)으로 관리할 수 있습니다. (LocalStorage 기반 유지)
- **지능형 초기 위치 설정**: 사용자 위치 권한을 기반으로 접속 시 현재 위치의 날씨로 자동 리다이렉트합니다.

## 🛠 기술 스택

- **Framework**: Next.js 16 (App Router), React 19
- **Language**: TypeScript
- **State Management & Data Fetching**: Tanstack Query (React Query) v5
- **Styling**: Tailwind CSS v4, Radix UI, Lucide Icons
- **AI Integration**: Groq SDK (LLM-based Reasoning for Logistics)
- **Design Pattern**: Feature-Sliced Design (FSD) 기반 아키텍처

## 📂 프로젝트 구조 (FSD 기반)

- `src/app`: 프로젝트의 전역 설정 및 레이아웃 구성 / Next 16에서 충돌하는 부분(pages)때문에 app에 route를 설정함.
- `src/features`: 핵심 비즈니스 로직 단위 분리 (`weather`, `favorites`).
- `src/entities`: 도메인 엔티티, API 추상화 (`Groq`, `Weather Query`), 데이터 모델.
- `src/shared`: 공통 사용 UI 컴포넌트(Button, Card, Input), 유틸리티, 상수 데이터.(shadcn)

## ⚙️ 실행 방법

1. **의존성 설치**

   ```bash
   pnpm install
   ```

2. **환경 변수 설정**
   `.env.local` 파일을 생성하고 다음 항목을 설정해야 합니다:

   ```env
   CURRENT_SERVER_URL=https://api.openweathermap.org/data/2.5/weather
   HOURLY_SERVER_URL=https://api.openweathermap.org/data/2.5/forecast
   SERVER_API_KEY=your_openweathermap_api_key
   GROQ_API_KEY=your_groq_api_key
   ```

3. **로컬 서버 실행**
   ```bash
   pnpm run dev
   ```

## 📖 기술적 의사결정

1. **Next.js 16 & React 19 채택**: 가장 최신의 프레임워크 기능을 활용하여 성능과 개발 경험을 극대화했습니다.
2. **Tanstack Query 사용**: 복잡한 서버 상태를 효율적으로 관리하고 데이터 캐싱 및 로딩 상태를 선언적으로 처리하기 위해 도입했습니다.
3. **FSD 아키텍처**: 프로젝트 규모가 커짐에 따라 코드의 재사용성과 유지보수성을 높이기 위해 관심사를 레이어별로 분리했습니다.
4. **LLM 기반 지오코딩**: 기존 API가 제공하지 못하는 상세한 한국어 행정구역 명칭을 얻기 위해 Groq LLM의 추론 능력을 활용하여 사용자 친화적인 주소 표기를 구현했습니다.
