const copyright = document.querySelector("#copyright");
const form = document.querySelector(".form");
const input = document.querySelector(".searchInput");
const list = document.querySelector(".cities");
const msg = document.querySelector(".msg");
const loader = document.querySelector("#loader");
const clock = document.querySelector("#clock");
const apikey = config.API_KEY;




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


// Loader
function showLoader() {
    loader.className = "show";
    setTimeout(() => {
        loader.className = loader.className.replace("show", "");
    }, 3000);
}

// Search
form.addEventListener("submit",(e) => {
    e.preventDefault();
    let inputVal = input.value;

    // Checking for Duplication
    const listItems = list.querySelectorAll('.results .city');
    const listItemsArray = Array.from(listItems);
    if(listItemsArray.length >0){
        const filteredArray = listItemsArray.filter((el) => {
            let content = "";
            if(inputVal.includes(",") ){
                if(inputVal.split(",")[1].length > 2){
                    inputVal = inputVal.split(",")[0];
                    content = el.querySelector('.city-name span')
                    .textContent.toLowerCase();
                } else {
                    content = el.querySelector('.city-name').dataset.name.toLowerCase();
                }
            } else {
                content = el.querySelector('.city-name span').textContent.toLowerCase();
            }
            return content == inputVal.toLowerCase();
        });
        if(filteredArray.length > 0){
            msg.textContent = `You already know the weather for ${filteredArray[0].querySelector(".city-name span").textContent}...
            Otherwise be more specific by adding a country code as well.`;
            form.reset();
            input.focus;
            return; 
        }
    }

    // Getting data from cache
    if(!("caches" in window)) {
        return null;
    } 

    // Loading animation
    showLoader();

    // Fetching data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apikey}&units=metric`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const {main, name, sys, weather, wind } = data;
        // localStorage.setItem("data", JSON.stringify(data));
        const icon = `http://openweathermap.org/img/w/${weather[0]["icon"]}.png`;
        // console.log(data);
        const li = document.createElement("li");
        li.classList.add("city");
        const markup = `
            <h2 class="city-name" data-name="${name},${sys.country}">
                <span>${name}</span>,
                <span>${sys.country}</span>
            </h2>
            <div class="city-temp">
                <p class="temp">${Math.round(main.temp)}<sup>°C</sup></p>
                <span>Feels like: ${main.feels_like}<sup>°C</sup></span>
            </div>
            <figure class="fig">
                <img class="city-icon" 
                    src=${icon}
                    alt=${weather[0]["description"]}
                    />
                <figcaption>
                    ${weather[0]["description"]}
                </figcaption>
            </figure>
            <div class="wind">
                <p>Wind Speed: ${wind.speed}m/s</p>
                <span><b>Humidity:</b> ${main.humidity} %</span>
                        <span><b>Pressure:</b> ${main.pressure} hPa</span>
            </div>
        `;
        li.innerHTML = markup;
        list.prepend(li);
        saveData(data);
    })
    .catch(() => {
        msg.textContent = "Please search a valid city name!";
    });
    msg.textContent = "";
    form.reset();
    input.focus();
   
});

showLoader();

const getLocalWeather = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            const weather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&appid=${apikey}&units=metric`;
            fetch(weather)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const { current } = data;
                const icon = `http://openweathermap.org/img/w/${current.weather[0]["icon"]}.png`;
                const li = document.createElement("li");
                li.classList.add("city");
                const markup = `
                    <h2 class="city-name" >
                        <span>${data.timezone}</span>
                    </h2>
                    <div class="city-temp">
                        <p class="temp">${Math.round(current.temp)}<sup>°C</sup></p>
                        <span>Feels like: ${current.feels_like}<sup>°C</sup></span>
                    </div>
                    <figure class="fig">
                        <img class="city-icon" 
                            src=${icon}
                            alt=${current.weather[0]["description"]}
                            />
                        <figcaption>
                            ${current.weather[0]["description"]}
                        </figcaption>
                    </figure>
                    <div class="wind">
                        <p>Wind Speed: ${current.wind_speed} m/s</p>
                        <span><b>Humidity:</b> ${current.humidity} %</span>
                        <span><b>Pressure:</b> ${current.pressure} hPa</span>
                    </div>
                `;
                li.innerHTML = markup;
                list.appendChild(li);
                saveData(data);
            })
        })
    }
}
getLocalWeather();

function saveData(list) {
    const data = JSON.stringify(list);
    localStorage.setItem("List", data);
}

// Footer
const year = document.createTextNode(new Date().getFullYear());
copyright.appendChild(year);


