
const CACHE_NAME = "weather";
// Files to cache here.
const FILES_TO_CACHE = [
    "/",
    "/offline.html",
    "/index.html",
    "/css/style.css",
    "/script.js",
    "/clock.js",
    "/install.js",
];

// Precache static resources
self.addEventListener("install", (evt) => {
    console.log("[ServiceWorker] Install");
    evt.waitUntil (
        caches.open(CACHE_NAME).then((cache) => {
            console.log("[ServiceWorker] Pre-caching offline page");
            return cache.addAll(FILES_TO_CACHE);
        })
    );
    self.skipWaiting();
});


// Remove previous cached data from disk
self/addEventListener("activate", (evt) => {
    console.log("[ServiceWorker] Activate");
    evt.waitUntil (
        caches.keys().then((keylist) => {
            return Promise.all(keylist.map((key) => {
                if(key !== CACHE_NAME) {
                    console.log("[ServiceWorker] Removing old cache", key);
                    return caches.delete(key);
                }
            }));
        })
    );
    self.clients.claim();
});

// Fetching data
self.addEventListener("fetch", (evt) => {
    console.log("[ServiceWorker] Fetch", evt.request.url);
    if(evt.request.mode !== "navigate") {
        // Not a page navigation, bail.
        return;
    }
    evt.respondWith(
        fetch(evt.request)
            .catch(() => {
                return caches.open(CACHE_NAME)
                    .then((cache) => {
                        return cache.match("offline.html");
                    });
            })
    );
});

