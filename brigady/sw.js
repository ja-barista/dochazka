/*  Minimalni service worker.
 *  Nic neuklada do mezipameti - jen musi existovat a obsluhovat fetch,
 *  jinak Chrome nenabidne "Pridat na plochu" a aplikace nepujde nainstalovat.
 *  Vlastni obsah bezi v ramu z Apps Scriptu, ten se cachovat nesmi.
 */

self.addEventListener('install', function (e) {
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (e) {
  e.respondWith(fetch(e.request).catch(function () {
    return new Response(
      '<!DOCTYPE html><meta charset="utf-8">' +
      '<body style="background:#4A3728;color:#F2EBDD;font-family:sans-serif;' +
      'display:flex;align-items:center;justify-content:center;height:100vh;' +
      'margin:0;text-align:center;padding:20px">' +
      'Nejsi pripojeny k internetu.<br>Zkus to znovu, az bude signal.</body>',
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }));
});
