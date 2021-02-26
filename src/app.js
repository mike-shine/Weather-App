import {apiKey} from '../apiKey.js';

function getWeather() {
  let city = prompt('Please enter a city');
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`, {mode: 'cors'})
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  getWeather();
});

// write functions that hit API
  // should be able to take a location (city) and return weather data for that location
  // just console.log for now

