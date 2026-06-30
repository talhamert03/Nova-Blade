/* NOVA BLADE service worker — tam offline önbellek.
   Standalone tek dosya kullanıyorsan (index.html her şeyi içeriyorsa)
   yalnızca onu cache'lemen yeterli. */
const CACHE = 'nova-blade-v10';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const req = e.request;
  const isNav = req.mode === 'navigate' ||
    (req.headers.get('accept')||'').indexOf('text/html') !== -1;
  if (isNav) {
    // HTML sayfası: ÖNCE ağ (her zaman en güncel sürüm), çevrimdışıysa cache'e düş
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(()=>{});
        return res;
      }).catch(()=> caches.match(req).then(hit => hit || caches.match('./index.html')))
    );
    return;
  }
  // statik varlıklar (?v= ile sürümlenmiş): ÖNCE cache, yoksa ağdan çek + sakla
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy)).catch(()=>{});
      return res;
    }).catch(()=>caches.match('./index.html')))
  );
});
