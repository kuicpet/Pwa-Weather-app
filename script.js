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
        const {main, name, rain, sys, weather, wind } = data;
        console.log(data);
        const li = document.createElement("li");
        li.classList.add("city");
        const markup = `
            <h2 class="city-name" data-name="${name},${sys.country}">
                <span>${name}</span>,
                <span>${sys.country}</span>
            </h2>
            <div class="city-temp">
                <p>Temp: ${Math.round(main.temp)}<sup>°C</sup></p>
                <p>Feels like: ${main.feels_like}<sup>°C</sup></p>
                <p>Temp Min: ${main.temp_min}<sup>°C</sup></p>
            </div>
            <div class="city-rain">
                <p>Rain: ${rain["1h"]}</p>
            </div>
        `;
        li.innerHTML = markup;
        list.appendChild(li);
    })
    .catch(() => {
        msg.textContent = "Please search a valid city name!";
    });
    msg.textContent = "";
    form.reset();
    input.focus();
   
});

// Footer
const year = document.createTextNode(new Date().getFullYear());
copyright.appendChild(year);