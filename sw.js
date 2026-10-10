const V="targhe-v3";
const FILES=["./","index.html","manifest.json","icon-192.png","icon-512.png","lib/tesseract.min.js","lib/worker.min.js","lib/tesseract-core-simd-lstm.wasm.js","lib/tesseract-core-simd-lstm.wasm","lib/tesseract-core-lstm.wasm.js","lib/tesseract-core-lstm.wasm","lib/lang/eng.traineddata.gz"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES.map(f=>new Request(f,{cache:"reload"})))));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  const u=new URL(e.request.url);
  const pagina=e.request.mode==="navigate"||u.pathname.endsWith("/index.html")||u.pathname.endsWith("/");
  if(pagina){
    /* pagina: prima la rete (versione aggiornata), cache solo se offline */
    e.respondWith(fetch(e.request,{cache:"reload"}).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match("index.html"))));
  }else{
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
  }
});
