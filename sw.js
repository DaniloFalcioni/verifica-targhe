const V="targhe-v1";
const FILES=["./","index.html","manifest.json","icon-192.png","icon-512.png","lib/tesseract.min.js","lib/worker.min.js","lib/tesseract-core-simd-lstm.wasm.js","lib/tesseract-core-simd-lstm.wasm","lib/tesseract-core-lstm.wasm.js","lib/tesseract-core-lstm.wasm","lib/lang/eng.traineddata.gz"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
