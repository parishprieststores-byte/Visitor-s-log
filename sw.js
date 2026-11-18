const C='visitorlog-v3',F=['./','./index.html','./manifest.json','./icon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(u=>c.add(new Request(u,{cache:'reload'})).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!=='GET'||!r.url.startsWith(self.location.origin))return;
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>{
  const net=fetch(r).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>null);
  if(hit){e.waitUntil(net);return hit}
  return net.then(res=>res||(r.mode==='navigate'?caches.match('./index.html'):Response.error()))}))});
