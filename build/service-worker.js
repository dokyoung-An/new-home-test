const CACHE_NAME = 'habang-cache-v2';
const STATIC_CACHE_NAME = 'habang-static-v2';
const DYNAMIC_CACHE_NAME = 'habang-dynamic-v2';

// 캐시하지 않을 요청 패턴
const NO_CACHE_PATTERNS = [
  /^chrome-extension:/,
  /^data:/,
  /^javascript:/
];

// 정적 리소스 목록
const STATIC_ASSETS = [
  '/index.html',
  '/manifest.json',
  '/img/bg-poster.webp',
  '/img-optimized/apartment/apart4.webp',
  '/img-optimized/apartment/apart4-mobile.webp',
  // 주요 정적 리소스 추가
];

// 캐시 만료 시간 설정 (24시간)
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => 
              cacheName.startsWith('habang-') && 
              ![CACHE_NAME, STATIC_CACHE_NAME, DYNAMIC_CACHE_NAME].includes(cacheName)
            )
            .map(cacheName => caches.delete(cacheName))
        );
      }),
      // 오래된 캐시 정리
      caches.open(DYNAMIC_CACHE_NAME).then(cache => {
        return cache.keys().then(requests => {
          return Promise.all(
            requests.map(request => {
              return cache.match(request).then(response => {
                if (response) {
                  const date = new Date(response.headers.get('date'));
                  if (Date.now() - date.getTime() > CACHE_EXPIRATION) {
                    return cache.delete(request);
                  }
                }
                return Promise.resolve();
              });
            })
          );
        });
      })
    ])
  );
});

self.addEventListener('fetch', (event) => {
  // 캐시하지 않을 요청 패턴 체크
  if (NO_CACHE_PATTERNS.some(pattern => pattern.test(event.request.url))) {
    return;
  }

  // HTML 요청은 네트워크 우선, 실패시 캐시
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  // 정적 에셋은 캐시 우선
  if (STATIC_ASSETS.includes(new URL(event.request.url).pathname)) {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
    return;
  }

  // 이미지, 비디오 등의 리소스는 캐시 우선, 백그라운드 업데이트
  if (event.request.destination === 'image' || 
      event.request.destination === 'video' ||
      event.request.destination === 'style' ||
      event.request.destination === 'script') {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          const fetchPromise = fetch(event.request)
            .then(networkResponse => {
              if (networkResponse && networkResponse.status === 200) {
                const clonedResponse = networkResponse.clone();
                caches.open(DYNAMIC_CACHE_NAME)
                  .then(cache => {
                    // 응답 헤더에 타임스탬프 추가
                    const responseToCache = new Response(clonedResponse.body, {
                      headers: new Headers({
                        ...Object.fromEntries(clonedResponse.headers.entries()),
                        'date': new Date().toUTCString()
                      })
                    });
                    cache.put(event.request, responseToCache);
                  });
              }
              return networkResponse;
            });

          return cachedResponse || fetchPromise;
        })
    );
    return;
  }

  // 기타 요청은 네트워크 우선, 실패시 캐시
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.status === 200) {
          const clonedResponse = response.clone();
          caches.open(DYNAMIC_CACHE_NAME)
            .then(cache => cache.put(event.request, clonedResponse));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
}); 