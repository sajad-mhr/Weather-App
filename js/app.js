const $ = document;
const APIkey = "6195d297679574bf84936dffcd014e0b";
const urlApi = "https://api.openweathermap.org/data/2.5/weather?q=";
const searchInput = $.getElementById("search-input");
const btn_search = $.getElementById("btn-search");
const loading = $.querySelector(".loading");
const error = $.querySelector(".error");
const weather_details = $.querySelector(".weather-details");
const other_details = $.querySelector(".other-details");

function showLoading() {
  loading.style.display = "block";
}
function hideLoading() {
  loading.style.display = "none";
}

function KeltoCel(temp) {
  let result = temp - 273.15;
  return result;
}

function getWeather(value) {
  weather_details.innerHTML = "";
  other_details.innerHTML = "";
  showLoading();
  error.style.display = "none";
  fetch(`${urlApi}${value}&appid=${APIkey}`)
    .then((res) => res.json())
    .then((data) => {
      let { main, weather, name, sys, wind } = data;

      let elem = `
      <span id="temp">${Math.floor(KeltoCel(main.temp))}°</span>
      <div
        style="display: flex; flex-direction: column;margin-right: 20px;"
      >
        <span id="title">${name}, ${sys.country ? sys.country : ""}</span>
        <span id="time">${showTodayDate()}</span>
      </div>
      <div
        style="display: flex; flex-direction: column;align-items: center;"
      >
        <div class="img-container">
        <img id="icon-weather" src="http://openweathermap.org/img/wn/${
          weather[0].icon
        }@4x.png" alt="" />
        
        </div>
        <span id="description">${weather[0].description}</span>
      </div>
      `;
      weather_details.insertAdjacentHTML("beforeend", elem);

      let other = `
        <div class="card">
          <span id="humidity">${main.humidity}%</span>
          <span>Humidity</span>
        </div>
        <div class="card">
          <span id="pressure">${main.pressure}mbar</span>
          <span>Pressure</span>
        </div>
        <div class="card">
          <span id="wind-speed">${wind.speed}km/h</span>
          <span>Wind Speed</span>
        </div>
      `;
      other_details.insertAdjacentHTML("beforeend", other);
      hideLoading();
    })
    .catch((err) => {
      console.log(err);
      error.style.display = "block";
      hideLoading();
    });
}

function showTodayDate() {
  let monthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "june",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let dayArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let myDate = new Date();

  let month = monthsArray[myDate.getMonth()].slice(0, 3);
  let day = myDate.getDate();
  let weekday = dayArray[myDate.getDay()];
  console.log(weekday);
  let year = myDate.getFullYear();

  return `${weekday}, ${month} ${day}, ${year}`;
}

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getWeather(e.target.value);
    e.target.value = "";
  }
});

btn_search.addEventListener("click", () => {
  let inputVal = searchInput.value;
  getWeather(inputVal);
  searchInput.value = "";
});

window.addEventListener("load", getWeather("mashhad"));

// <img id="icon-weather" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
//           weather[0].icon
//         }.svg" alt="" />
