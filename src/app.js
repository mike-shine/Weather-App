import {apiKey} from '../apiKey.js';

let loc, temp, fore;


const weatherDataContainer = document.createElement('div');
weatherDataContainer.style.width = '305px';
weatherDataContainer.style.height = '315px';
weatherDataContainer.style.border = '3px dotted';
document.body.appendChild(weatherDataContainer);

const location = document.createElement('div');
location.style.width = '300px';
location.style.height = '100px';
location.style.border = '2px solid yellow';
// location.textContent = loc;
weatherDataContainer.appendChild(location);

const temperature = document.createElement('div');
temperature.style.width = '300px';
temperature.style.height = '100px';
temperature.style.border = '2px solid green';
// temperature.textContent = temp;
weatherDataContainer.appendChild(temperature);

const forecast = document.createElement('div');
forecast.style.width = '300px';
forecast.style.height = '100px';
forecast.style.border = '2px solid red';
// forecast.textContent = fore;
weatherDataContainer.appendChild(forecast);

function determineTempRange(temperature, body) {
  if (body.classList.length > 0) {
    body.classList = [];
  }
  let temp = Number(temperature);
  if (temp < 11) {
    body.classList.add('coldest');
  } else if (temp >= 11 && temp < 23) {
    body.classList.add('reallyCold');
  } else if (temp >= 23 && temp < 35) {
    body.classList.add('veryCold');
  } else if (temp >= 35 && temp < 47) {
    body.classList.add('kindaCold');
  } else if (temp >= 47 && temp < 59) {
    body.classList.add('chilly');
  } else if (temp >= 59 && temp < 70) {
    body.classList.add('mild');
  } else if (temp >= 70 && temp < 77) {
    body.classList.add('warm');
  } else if (temp >= 77 && temp < 85) {
    body.classList.add('kindaHot');
  } else if (temp >= 85 && temp < 93) {
    body.classList.add('veryHot');
  } else if (temp >= 93 && temp < 100) {
    body.classList.add('reallyHot');
  } else if (temp >= 100 ) {
    body.classList.add('hottest');
  }
}



async function getWeather() {
    let city = document.querySelector('#city');
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value.toString()}&appid=${apiKey}&units=imperial`, {mode: 'cors'});
    let weatherData = await response.json();
    let relevantWeatherData = {
      location: weatherData.name,
      temperature: weatherData.main.temp,
      weather: weatherData.weather[0].description
    }
    console.table(relevantWeatherData);
    determineTempRange(weatherData.main.temp, document.body);
    location.textContent = weatherData.name;
    temperature.textContent = weatherData.main.temp;
    forecast.textContent = weatherData.weather[0].description;
};

let userInput = document.querySelector('#city');
let searchBar = document.querySelector('#submit');

searchBar.addEventListener('click', function(e) {
  e.preventDefault();
  getWeather();
})




