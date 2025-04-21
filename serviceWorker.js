const staticCacheName = "links-rs";

// Arquivos que serão armazenados no cache durante a instalação
const assets = [
  "/",
  "/index.html",
  "/main.css",
  "/config/apps.js",
  "/utils/cookies.js",
  "/script.js",
  "/assets/icons/academiaV.avif",
  "/assets/icons/alelo.webp",
  "/assets/icons/chatdani.avif",
  "/assets/icons/easy.png",
  "/assets/icons/efika.png",
  "/assets/icons/magictool.avif",
  "/assets/icons/multi.jpg",
  "/assets/icons/myahgora.png",
  "/assets/icons/timestampcam.webp",
  "/assets/icons/vicky.avif",
  "/assets/icons/ZEUS.png",
  "/assets/logo.png",
  "/assets/moon.png",
  "/assets/sun.png",
  "/offline.html" // opcional, adicione esse arquivo no projeto
];

// Evento de instalação: armazena arquivos no cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Evento de ativação: remove caches antigos
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== staticCacheName)
          .map(key => caches.delete(key))
      );
    })
  );
});

// Evento de busca: responde com cache ou busca da rede, com fallback offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedRes => {
      return cachedRes || fetch(event.request).catch(() => caches.match("/offline.html"));
    })
  );
});
