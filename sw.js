// MozCommunity Service Worker v10 - Rede primeiro (sempre atualizado), cache como reserva offline
const CACHE_NAME = 'mozcommunity-v10';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './favicon-32.png',
  './favicon-16.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth-compat.js',
  'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore-compat.js',
  'https://www.gstatic.com/firebasejs/10.7.0/firebase-storage-compat.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        urlsToCache.map(url => cache.add(url).catch(err => {
          console.warn('SW: falha ao guardar em cache:', url, err.message);
        }))
      );
    })
  );
  self.skipWaiting(); // ativa a nova versão imediatamente, sem esperar que todos os separadores fechem
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name)) // limpa versões antigas do cache
      );
    })
  );
  self.clients.claim(); // toma controlo imediato de todas as páginas abertas
});

self.addEventListener('fetch', (event) => {
  // Nunca intercetar pedidos ao Firebase (Auth, Firestore, Storage) — deixar sempre ir direto à rede
  if (event.request.url.includes('firestore.googleapis.com') ||
      event.request.url.includes('firebasestorage.googleapis.com') ||
      event.request.url.includes('identitytoolkit.googleapis.com') ||
      event.request.url.includes('securetoken.googleapis.com')) {
    return;
  }

  // ESTRATÉGIA: REDE PRIMEIRO
  // Tenta sempre buscar a versão mais recente da internet.
  // Só usa o que está guardado no telemóvel (cache) se não houver rede.
  // Isto garante que, assim que há internet, a app mostra sempre a versão
  // mais recente que foi publicada — nunca fica presa numa versão antiga.
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Sem rede: usa o que estiver guardado
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});
