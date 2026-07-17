const CACHE_PREFIX="lorespan-";
const CACHE_NAME='lorespan-v8.7.2';
const CORE=[
  "./",
  "./index.html",
  "./offline.html",
  "./manifest.webmanifest",
  "./library-concept-shelf-v872.webp",
  "./lorespan-desk-room-v872.webp",
  "./magic-book-192-v2.png",
  "./magic-book-512.png",
  "./magic-book-maskable-192.png",
  "./magic-book-maskable-512.png",
  "./hero-top-blue-book.webp",
  "./hero-book-v512-clean.webp",
  "./library-hero.png",
  "./lorespan-home.webp",
  "./cover-vantheir-clean-v872.webp",
  "./cover-hero-academia-v872.webp",
  "./cover-beastbound-clean-v872.webp",
  "./cover-tides-clean-v872.webp",
  "./cover-guild-clean-v872.webp",
  "./cover-starfall-v872.webp",
  "./cover-moonwake-v872.webp",
  "./cover-emberwake-v872.webp",
  "./cover-ironhaven-v872.webp",
  "./cover-veilwood-v872.webp"
];
self.addEventListener("install",e=>e.waitUntil((async()=>{const c=await caches.open(CACHE_NAME);await c.addAll(CORE);await self.skipWaiting()})()));
self.addEventListener("activate",e=>e.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith(CACHE_PREFIX)&&k!==CACHE_NAME)await caches.delete(k);await self.clients.claim()})()));
self.addEventListener("message",e=>{if(e.data?.type==="SKIP_WAITING")self.skipWaiting();if(e.data?.type==="CLEAR_OLD_LORESPAN_CACHES")e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith(CACHE_PREFIX)&&k!==CACHE_NAME).map(k=>caches.delete(k)))))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;const u=new URL(e.request.url);if(e.request.mode==="navigate"||u.pathname.endsWith("/index.html")){e.respondWith(fetch(e.request,{cache:"no-store"}).then(r=>{if(r.ok)caches.open(CACHE_NAME).then(c=>c.put("./index.html",r.clone()));return r}).catch(async()=>await caches.match("./index.html")||await caches.match("./offline.html")));return}e.respondWith((async()=>{const c=await caches.match(e.request);const n=fetch(e.request,{cache:"no-cache"}).then(r=>{if(r.ok)caches.open(CACHE_NAME).then(x=>x.put(e.request,r.clone()));return r});return c||n.catch(async()=>await caches.match("./offline.html")||new Response("Offline",{status:504}))})())});
