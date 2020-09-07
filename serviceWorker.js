// Register Service Worker
if("serviceWorker" in navigator){
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/serviceWorker.js")
        .then((reg) => {
            console.log("Service worker successfully registered!", reg);
        });
    });
}