const copyright = document.querySelector("#copyright");
const form = document.querySelector(".form");
const input = document.querySelector(".searchInput");
const list = document.querySelector(".cities");
const msg = document.querySelector(".msg");
const apikey = "46797972ff33fdd2b5de17ae270c170f";

// Search
form.addEventListener("submit",(e) => {
    e.preventDefault();
    let cityName = input.value;
    // Checking for Duplication
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=metric`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const weather = data;
        console.log(weather);
    })
   
});

// Footer
const year = document.createTextNode(new Date().getFullYear());
copyright.appendChild(year);