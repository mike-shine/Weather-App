import {apiKey} from '../apiKey.js';

async function getWeather() {
    let city = document.querySelector('#city');
    // let city = prompt('Please enter a city');
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
  console.log(userInput.value);
  getWeather();
})


// window.addEventListener('DOMContentLoaded', () => {

//   async function showWeather(city) {
//     getWeather(city);
//   }
// });


    // .then(function(response) {
  //   return response.json();
  // })
  // .then(function(data) {
  //   console.log(data);
  // });

