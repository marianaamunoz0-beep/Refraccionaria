// =============================
//       SERVICE WORKER
// =============================
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js")
    .then(reg => console.log("SW registrado:", reg.scope))
    .catch(err => console.error("Error SW:", err));
}


// Nombre del caché (cámbialo cuando actualices archivos)
const CACHE_NAME = 'v1.1_cache_Mariana_Munoz_PWA';

// Archivos que se guardarán en caché
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './recetas.css',
  './main.js',
  './imagenes/fav.png'
];

// INSTALACIÓN — guardar archivos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
      .catch(err => console.log('Error al cachear archivos:', err))
  );
});

// ACTIVACIÓN — eliminar cachés anteriores
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (!cacheWhitelist.includes(name)) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// FETCH — usar caché o red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(res => res || fetch(event.request))
  );
});

// SKIP WAITING manual
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});

// Notificaciones
self.addEventListener('notificationclick', event => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://web.whatsapp.com/')
  );
});
