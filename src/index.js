function refreshWeather(response) {
    let temperatureElement = document.querySelector("#weather-temperature");
    let temperature =response.data.temperature.current;
    temperatureElement.innerHTML = Math.round(temperature);
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);

    // to ensure the response is for the city typed in regardless of typos etc
    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}


function citySearch (city) {
    // make api call & update interface
    let apiKey = "f73594a0o47570b2323t3d3f7085b0ba";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);
}

function submitSearch(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#city-input");
    
    citySearch(searchInput.value);
}

function getForecast(city) {
  let apiKey = "f73594a0o47570b2323t3d3f7085b0ba";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml = forecastHtml + `
    <div class="weather-forecast-day">
      <div class="weather-day">${day}</div>
        <div class="weather-icon">🌥️</div>
        <div class="weather-temperatures">
        <div class="weather-temperature">15°C</div>
        <div class="weather-temperature">9°C</div>
      </div>
    </div>`
  });

  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", submitSearch);

citySearch("Paris");

