const CACHE_NAME = 'habang-cache-v2';

// 캐시하지 않을 요청 패턴
const NO_CACHE_PATTERNS = [
  /^chrome-extension:/,
  /^data:/,
  /^javascript:/
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  // 캐시하지 않을 요청 패턴 체크
  if (NO_CACHE_PATTERNS.some(pattern => pattern.test(event.request.url))) {
    return;
  }

  // HTML 요청은 항상 네트워크 우선
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // 유효한 응답만 캐시
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            })
            .catch(error => {
              console.error('Cache put error:', error);
            });
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
}); 