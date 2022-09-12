//Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v6';
//Add list of files to cache here.
const FILES_TO_CACHE = [
  'index.html',
  'contest.html',
  'contact.html',
  'confirmation.html',
  'characters.html',
  'js/index.js',
  'css/style.css',
  'bootstrap/js/bootstrap.bundle.min.js',
  'assets/icons/icon-192x192.png',
  'assets/icons/icon-256x256.png',
  'assets/icons/icon-384x384.png',
  'assets/icons/icon-512x512.png',
  'assets/images/ac-2.webp',
  'assets/images/ac-3.webp',
  'assets/images/ac-4-black-flag.webp',
  'assets/images/ac-brotherhood.webp',
  'assets/images/ac-odyssey.webp',
  'assets/images/ac-origin.webp',
  'assets/images/ac-revelations.webp',
  'assets/images/ac-rogue.webp',
  'assets/images/ac-syndicate.webp',
  'assets/images/ac-unity.webp',
  'assets/images/ac-valhalla.webp',
  'assets/images/arno.webp',
  'assets/images/basim.webp',
  'assets/images/bayek.webp',
  'assets/images/connor.webp',
  'assets/images/edward_kenway.webp',
  'assets/images/eivor.webp',
  'assets/images/ezio.webp',
  'assets/images/header-bg.webp',
  'assets/images/header-logo.svg',
  'assets/images/jacob_and_evie_frye.webp',
  'assets/images/kassandra_alexios.webp',
  'assets/images/logo.svg',
  'assets/images/screenshot.png',
  'assets/images/section-bg.webp',
  'assets/images/section-reverse-bg.webp',
  'assets/images/shay.webp',
];
self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  // Precache static resources here.
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});
self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  //Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});
self.addEventListener('fetch', (evt) => {
  console.log('[ServiceWorker] Fetch', evt.request.url);
  //Add fetch event handler here.
  if (evt.request.mode !== 'navigate') {
    // Not a page navigation, bail.
    return;
  }
  evt.respondWith(
    fetch(evt.request).catch(() => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match('index.html');
      });
    })
  );
});
