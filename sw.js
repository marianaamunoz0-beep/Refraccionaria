//------------PROGRAMACION PRINCIPAL DE SERVICE WORKER-----------------------
// Asignar nombre y version de cache
const CACHE_NAME= 'v1_cache_Mariana_Muñoz_PWA';

//Ficheros a cachear en la App
var urlsTocCache=[
    './',
    './index.html',
    './manifest.json',
    './recetas.css',
    './sw.js'

];

//Evento de instalacion: cachear archivos
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Archivos en cache correctamente');
            return cache.addAll(urlsTocCache);
        })
        .catch(err => console.log('Error al cachear',err))
    );
});
//siempre usas rutas relativas (./archivo.html, ./css/styles.css),
//no absolutas (http://...)

//cada vez que actualices archivos importantes, cambia la version del cache (v2_cache_...) para que el navegador descargue la nueva version