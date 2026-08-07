// Ontario GPS — Service Worker v1
// Caches the app shell so it loads instantly offline
// Map tiles are cached as you browse (up to 500 tiles)

const APP_CACHE = 'ont-gps-app-v5';
const TILE_CACHE = 'ont-gps-tiles-v5';
const MAX_TILES = 500;

const APP_SHELL = [
  '/ontario-gps/',
  '/ontario-gps/index.html',
  '/ontario-gps/manifest.json',
  '/ontario-gps/icon-192.png',
  '/ontario-gps/icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js',
];

// ── Install: cache app shell ──────────────────────────────────────────────────
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(APP_CACHE)
      .then(cache => cache.addAll(APP_SHELL).catch(e => console.warn('Shell cache partial:', e)))
      .then(() => self.skipWaiting())
  );
});

// ── Activate: clean old caches ────────────────────────────────────────────────
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys
        .filter(k => k !== APP_CACHE && k !== TILE_CACHE)
        .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch strategy ────────────────────────────────────────────────────────────
self.addEventListener('fetch', evt => {
  const url = new URL(evt.request.url);

  // Map tiles — cache-first with tile limit
  if (url.hostname.includes('tile.openstreetmap.org')) {
    evt.respondWith(tileStrategy(evt.request));
    return;
  }

  // Routing / geocoding APIs — network only (must be live)
  if (
    url.hostname.includes('graphhopper.com') ||
    url.hostname.includes('project-osrm.org') ||
    url.hostname.includes('nominatim.openstreetmap.org')
  ) {
    evt.respondWith(fetch(evt.request));
    return;
  }

  // App shell — cache-first, fallback to network
  evt.respondWith(
    caches.match(evt.request).then(cached => cached || fetch(evt.request))
  );
});

async function tileStrategy(request) {
  const cache = await caches.open(TILE_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      // Evict oldest tiles if over limit
      const keys = await cache.keys();
      if (keys.length >= MAX_TILES) {
        await cache.delete(keys[0]);
      }
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('', { status: 503, statusText: 'Offline' });
  }
}
