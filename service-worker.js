/*
Copyright 2015, 2019 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

// Incrementing OFFLINE_VERSION will kick off the install event and force
// previously cached resources to be updated from the network.
const OFFLINE_VERSION = 1;
const CACHE_NAME = 'static_cache_v11';
// Customize this with a different URL if needed.
const FILES_TO_CACHE = [
  'index.html',
  'contest.html',
  'characters.html',
  'confirmation.html',
  'contact.html',
  'js/index.js',
  'css/style.css',
  'bootstrap/js/bootstrap.bundle.min.js',
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
  'assets/icons/icon-512x512.png',
  'assets/icons/icon-384x384.png',
  'assets/icons/icon-256x256.png',
  'assets/icons/icon-192x192.png',
  'assets/icons/icon-144x144.png',
  'assets/icons/icon-96x96.png',
  'assets/icons/favicon.ico',
];

self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching files to cache');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
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

  // Tell the active service worker to take control of the page immediately.
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
    fetch(evt.request).catch(async () => {
      const cache = await caches.open(CACHE_NAME);
      return await cache.match('index.html');
    })
  );
});
