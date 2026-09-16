const CACHE = "shao-fun-__VERSION__";
const PRECACHE = ["__PRECACHE__"];
const OFFLINE = "/offline/";

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

const navigation = async (request) => {
  const cache = await caches.open(CACHE);
  const { pathname } = new URL(request.url);
  const cached =
    (await cache.match(pathname)) ?? (pathname.endsWith("/") ? undefined : await cache.match(`${pathname}/`));
  if (cached) return cached;
  try {
    return await fetch(request);
  } catch {
    return (await cache.match(OFFLINE)) ?? Response.error();
  }
};

const asset = async (request) => {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok && response.type === "basic") cache.put(request, response.clone());
  return response;
};

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET" || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(request.mode === "navigate" ? navigation(request) : asset(request));
});
