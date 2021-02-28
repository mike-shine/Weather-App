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




