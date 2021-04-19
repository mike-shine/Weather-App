import {weatherApiKey, giphyApiKey} from '../apiKey.js';

/* Structural/DOM components */

let isCelsius = false;

function tempUnit() {
  return Boolean(isCelsius)
  ? 'metric'
  : 'imperial';
}

function appendCelsiusOrFarenheit() {
  if (isCelsius) {
    temperature.textContent += '°C';
  } else {
    temperature.textContent += '°F';
  }
}

function round(value, precision) {
  var multiplier = Math.pow(10, precision || 1);
  return Math.round(value * multiplier) / multiplier;
}

const body = document.body;
body.setAttribute('id', 'bodyContent');
// body.style.border = '3px dotted cyan';

const inputContainer = document.getElementById('inputContainer');
inputContainer.setAttribute('id', 'inputContainer');
// inputContainer.style.border = '2px dotted chartreuse'
body.appendChild(inputContainer);


const weatherDataContainer = document.createElement('div');
weatherDataContainer.setAttribute('id', 'weatherDataContainer');
weatherDataContainer.style.width = '305px';
weatherDataContainer.style.height = '750px';
// weatherDataContainer.style.border = '3px dotted';
body.appendChild(weatherDataContainer);

const location = document.createElement('div');
location.style.width = '300px';
location.style.height = '100px';
// location.style.border = '2px solid yellow';
weatherDataContainer.appendChild(location);

const temperature = document.createElement('div');
temperature.style.width = '300px';
temperature.style.height = '100px';
// temperature.style.border = '2px solid green';
weatherDataContainer.appendChild(temperature);

const forecast = document.createElement('div');
forecast.style.width = '300px';
forecast.style.height = '100px';
// forecast.style.border = '2px solid red';
weatherDataContainer.appendChild(forecast);

// const relevantGif = document.createElement('img');
// relevantGif.style.width = '300px';
// relevantGif.style.height = '350px';
// relevantGif.style.border = '2px solid white';
// weatherDataContainer.appendChild(relevantGif);




/* Farenheit/Celsius toggle switch */

const toggleSwitchContainer = document.createElement('label');
toggleSwitchContainer.classList.add('switch');
inputContainer.appendChild(toggleSwitchContainer);

const unitToggleSwitch = document.createElement('input');
unitToggleSwitch.setAttribute('type', 'checkbox');
toggleSwitchContainer.appendChild(unitToggleSwitch);

const slider = document.createElement('span');
slider.classList.add('slider', 'round');
toggleSwitchContainer.appendChild(slider);



/* Farenheit/Celsius toggle functions  */

function convertToFarenheit(tempInCelsius) {
  let convertedValue =  (Number(tempInCelsius) * (9 / 5)) + 32;
  return round(convertedValue, 1);
}

function convertToCelsius(tempInFarenheit) {
  let convertedValue = (Number(tempInFarenheit) - 32) * (5 / 9);
  return round(convertedValue, 1);
}

function determineUnitAndConvert(temp) {
  return Boolean(isCelsius)
  ? convertToFarenheit(temp)
  : convertToCelsius(temp);
}




/* synchronous function that changes the background color gradient commensurate with the weather data fetched from the weather API  */

function determineTempRange(temperature, body) {
  if (body.classList.length > 0) {
    body.classList = [];
  }
  let temp;
  Boolean(isCelsius)
  ? temp = convertToFarenheit(temperature)
  : temp = Number(temperature);
  if (temp < 0) {
    body.classList.add('freezing');
  } else if (temp >= 0 && temp < 15) {
    body.classList.add('reallyCold');
  } else if (temp >= 15 && temp < 30) {
    body.classList.add('veryCold');
  } else if (temp >= 30 && temp < 45) {
    body.classList.add('kindaCold');
  } else if (temp >= 45 && temp < 59) {
    body.classList.add('chilly');
  } else if (temp >= 59 && temp < 70) {
    body.classList.add('perfectWeather');
  } else if (temp >= 70 && temp < 75) {
    body.classList.add('warm');
  } else if (temp >= 75 && temp < 81) {
    body.classList.add('kindaHot');
  } else if (temp >= 81 && temp < 88) {
    body.classList.add('veryHot');
  } else if (temp >= 88 && temp < 93) {
    body.classList.add('reallyHot');
  } else if (temp >= 93) {
    body.classList.add('onFire');
  }
}




/* asynchronous function that fetches weather from openWeather API */

async function getWeather() {
    let city = document.querySelector('#city');
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value.toString()}&appid=${weatherApiKey}&units=${tempUnit()}`, {mode: 'cors'});
    let weatherData = await response.json();
    let relevantWeatherData = {
      location: weatherData.name,
      temperature: weatherData.main.temp,
      weather: weatherData.weather[0].description
    }
    console.table(relevantWeatherData);
    await determineTempRange(weatherData.main.temp, body);

    location.textContent = weatherData.name;

    let rawTempData = weatherData.main.temp;
    temperature.textContent = round(Number(rawTempData), 1);
    appendCelsiusOrFarenheit();

    forecast.textContent = weatherData.weather[0].description;

};


let userInput = document.querySelector('#city');
let searchBar = document.querySelector('#submit');


searchBar.addEventListener('click', function(e) {
  e.preventDefault();
  getWeather();
  userInput.value = '';
});

unitToggleSwitch.addEventListener('click', function() {
  if (isCelsius) {
    isCelsius = false;
    temperature.textContent = convertToFarenheit(temperature.textContent.slice(0, temperature.textContent.indexOf('°')));
    appendCelsiusOrFarenheit();
  } else {
    isCelsius = true;
    temperature.textContent = convertToCelsius(temperature.textContent.slice(0, temperature.textContent.indexOf('°')));
    appendCelsiusOrFarenheit();
  }
});



