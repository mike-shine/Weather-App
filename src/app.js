import {apiKey} from '../apiKey.js';

async function getWeather() {

    let city = prompt('Please enter a city');
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`, {mode: 'cors'});
    let weatherData = await response.json();
    console.log(weatherData);
    // .then(function(response) {
    //   return response.json();
    // })
    // .then(function(res) {
    //   console.log(res);
    // })
};


window.addEventListener('DOMContentLoaded', () => {
  getWeather();
});

// write functions that hit API
  // should be able to take a location (city) and return weather data for that location
  // just console.log for now

    // .then(function(response) {
  //   return response.json();
  // })
  // .then(function(data) {
  //   console.log(data);
  // });

