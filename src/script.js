function formatDate(date) {
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

  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${day} ${hour}:${minute}`;
}

let time = document.querySelector("#date");
let now = new Date();
time.innerHTML = formatDate(now);

function showForecastDays() {
  let dayForecast = document.querySelector("#forecast-days");
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  let dayForecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    dayForecastHTML =
      dayForecastHTML +
      `<div class= "col-2 ">
                  <div class="weather-forecast-date">${day}</div>
                  <div class="weather-forecast-icon"><img src="http://openweathermap.org/img/wn/10d@2x.png" alt=""
></div>
                  <div class="weather-forecast-temp">
                    <span class="weather-forecast-days-max">10°</span>
                    <span class="weather-forecast-days-min">8°</span></div>
                </div>
`;
  });

  dayForecastHTML = dayForecastHTML + `</div>`;
  dayForecast.innerHTML = dayForecastHTML;
}

function showCityWeather(response) {
  console.log(response.data);
  celsiusTemp = Math.round(response.data.main.temp);

  document
    .querySelector("#now-icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#now-icon")
    .setAttribute("alt", response.data.weather[0].description);

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp-now").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feeling").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}
function search(city) {
  let apiKey = "d327f9521127853e671914b6a74e0659";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showCityWeather);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function getPosition(position) {
  let apiKey = "d327f9521127853e671914b6a74e0659";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showCityWeather);
}
function clickLocalButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

let locateButton = document.querySelector("#locate-button");
locateButton.addEventListener("click", clickLocalButton);

function changeToFah(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let tempNow = document.querySelector("#temp-now");
  let fahTemp = (celsiusTemp * 9) / 5 + 32;
  tempNow.innerHTML = Math.round(fahTemp);
}

function changeToCel(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let tempNow = document.querySelector("#temp-now");
  tempNow.innerHTML = Math.round(celsiusTemp);
}

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", changeToCel);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", changeToFah);

let celsiusTemp = null;

search("london");
showForecastDays();
