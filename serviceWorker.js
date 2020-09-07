// Register Service Worker
if("serviceWorker" in navigator){
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/serviceWorker.js")
        .then((reg) => {
            console.log("Service worker successfully registered!", reg);
        });
    });
}

// Files to cache here.
const FILES_TO_CACHE = [
    "/offline.html",
];

// Precache static resources
evt.waitUntil (
    caches.open(CACHE_NAME).then((cache) => {
        console.log("[ServiceWorker] Pre-caching offline page");
        return cache.addAll(FILES_TO_CACHE);
    })
);

// Remove previous cached data from disk
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

// Add fetch event handler 
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