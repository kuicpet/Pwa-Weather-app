const clock = document.querySelector("#clock");
const copyright = document.querySelector("#copyright");

// Clock
function showTime() {
    let time = new Date();
    clock.textContent = time.toLocaleString("en-Us",{
        month: "long",
        day: "numeric",
        hour : "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true
    });
};
showTime();
setInterval(showTime, 1000);

// Footer
const year = document.createTextNode(new Date().getFullYear());
copyright.appendChild(year);