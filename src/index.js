function refreshWeather(response) {
    let temperatureElement = document.querySelector("#weather-temperature");
    let temperature =response.data.temperature.current;
    temperatureElement.innerHTML = Math.round(temperature);
    let cityElement = document.querySelector("#city");
    // to ensure the response is for the city typed in regardless of typos etc
    cityElement.innerHTML = response.data.city;
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", submitSearch);

citySearch("Paris");