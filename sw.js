// Ontario GPS Service Worker
// Caches app shell for offline use.
// External APIs (ORS, Nominatim, Valhalla, TomTom, Firebase) are NEVER cached.

const CACHE_NAME = 'ont-gps-app-v7';
const CACHE_URLS = [
  '/ontario-gps/',
  '/ontario-gps/index.html',
  '/ontario-gps/manifest.json',
  '/ontario-gps/icon-192.png',
  '/ontario-gps/icon-512.png',
];

// URLs that must NEVER be intercepted by the SW — always fetch live
const BYPASS_ORIGINS = [
  'api.openrouteservice.org',
  'nominatim.openstreetmap.org',
  'router.project-osrm.org',
  'api.tomtom.com',
  'overpass-api.de',
  'firebaseio.com',
  'googleapis.com',
  'gstatic.com',
  'cdnjs.cloudflare.com',
  'tile.openstreetmap.org',
  'gps.oldproconstructionservices.com',  // Valhalla home server
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Always bypass SW for external APIs and the Valhalla home server
  if(BYPASS_ORIGINS.some(origin => url.hostname.includes(origin))){
    return; // let browser handle it directly — no SW interception
  }

  // Cache-first for app shell files
  e.respondWith(
    caches.match(e.request).then(cached => {
      if(cached) return cached;
      return fetch(e.request).then(response => {
        // Only cache same-origin successful responses
        if(response && response.status === 200 && url.origin === self.location.origin){
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        }
        return response;
      });
    }).catch(() => caches.match('/ontario-gps/index.html'))
  );
});
