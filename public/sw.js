// Offline-Ready PWA Service Worker for Arrow Puzzle (v17 — Pre-cached Full Offline Play & Vercel Ready)
const CACHE_NAME = 'arrow-puzzle-arena-v17';

const OFFLINE_PRECACHE_URLS = [
  '/',
  '/index.html',
  '/styles.css?v=17',
  '/manifest.json?v=17',
  '/favicon.svg',
  '/merchant-qr.jpg',
  '/js/shapes.js?v=17',
  '/js/generator.js?v=17',
  '/js/audio.js?v=17',
  '/js/leaderboard.js?v=17',
  '/js/merchant-qr.js?v=17',
  '/js/app.js?v=17'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(OFFLINE_PRECACHE_URLS).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  let url;
  try {
    url = new URL(req.url);
  } catch (_) {
    return;
  }
  if (url.origin !== self.location.origin || url.pathname.startsWith('/api') || url.pathname.endsWith('.apk') || url.pathname.endsWith('.zip')) return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.status === 200 && res.type === 'basic') {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, clone)).catch(() => {});
        }
        return res;
      })
      .catch(async () => {
        const directMatch = await caches.match(req);
        if (directMatch) return directMatch;
        const strippedMatch = await caches.match(url.pathname);
        if (strippedMatch) return strippedMatch;
        if (req.mode === 'navigate') {
          const fallbackDoc = await caches.match('/index.html') || await caches.match('/');
          if (fallbackDoc) return fallbackDoc;
        }
        return Response.error();
      })
  );
});
