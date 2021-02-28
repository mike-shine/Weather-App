import {apiKey} from '../apiKey.js';


const weatherDataContainer = document.createElement('div');
weatherDataContainer.style.width = '300px';
weatherDataContainer.style.height = '300px';
weatherDataContainer.style.border = '3px dotted';
document.body.appendChild(weatherDataContainer);



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
};

let userInput = document.querySelector('#city');
let searchBar = document.querySelector('#submit');

searchBar.addEventListener('click', function(e) {
  e.preventDefault();
  getWeather();
})




