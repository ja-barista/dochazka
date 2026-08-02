// Minimální service worker.
// Nic necachuje – jen zajišťuje, aby Chrome nabídl instalaci na plochu.

self.addEventListener('install', function (e) {
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (e) {
  e.respondWith(fetch(e.request).catch(function () {
    return new Response('Bez připojení k internetu.', {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }));
});
