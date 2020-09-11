window.addEventListener("beforeinstallprompt", saveBeforeInstallPromptEvent);

let deferredInstallPrompt = null;
const installButton = document.createElement("button");
installButton.addEventListener("click", installPWA);

function saveBeforeInstallPromptEvent(evt) {
    deferredInstallPrompt = evt;
    installButton.removeAttribute('hidden');
};

function installPWA(evt) {
    deferredInstallPrompt.prompt();
    evt.srcElement.setAttribute("hidden", true);
    
    deferredInstallPrompt.userChoice
        .then((choice) => {
            if (choice.outcome === "accepted") {
                console.log("User accepted the A2HS prompt", choice);
            } else {
                console.log("User dismissed the A2HS prompt", choice);
            }
            deferredInstallPrompt = null;
        });
}

window.addEventListener("appInstalled", logAppInstalled);

function logAppInstalled(evt) {
    console.log("Weather App was installed. ", evt);
}