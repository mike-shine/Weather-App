import {apiKey} from '../apiKey.js';

async function getWeather() {

    let city = prompt('Please enter a city');
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`, {mode: 'cors'});
    let weatherData = await response.json();
    let relevantWeatherData = {
      location: weatherData.name,
      temperature: weatherData.main.temp,
      weather: weatherData.weather[0].description
    }
    console.table(relevantWeatherData);
};


window.addEventListener('DOMContentLoaded', () => {
  getWeather();
});


    // .then(function(response) {
  //   return response.json();
  // })
  // .then(function(data) {
  //   console.log(data);
  // });

