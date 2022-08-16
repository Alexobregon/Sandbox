

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector('#changeLocationForm').addEventListener("submit", (event) => changeLocation(event));
  renderLike();

})
let storage;
let weatherLocation = 'Seattle';
let IsDarkmode = false;
let lat = 47.6062
let lon = -122.3321
// let lat = ""
// let lon = ""

function fetchWeather() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + weatherLocation + '&units=imperial&appid=aac56d8ba335e529dfa836fcfbfb5d1d')
    .then(response => response.json())
    .then(data => renderWeather(data));
  
    
  }

  function fetchPolutionReport() {
    fetch('https://api.openweathermap.org/data/2.5/air_pollution?lat=' + lat + '&lon=' + lon + '&appid=aac56d8ba335e529dfa836fcfbfb5d1d')
    // fetch('https://api.openweathermap.org/data/2.5/air_pollution?lat=47.6062&lon=-122.3321&appid=aac56d8ba335e529dfa836fcfbfb5d1d')
    .then(response => response.json())
    .then(data => renderPollution(data));
    
  }

  function renderPollution(json) {
    console.log(json);
    storage = json
    
    // document.querySelector('#right').innerHTML = "test"
    document.querySelector('#airQ').innerHTML = json.list[0].main.aqi
    document.querySelector('#no2').innerHTML = 'NO2 levels ' + json.list[0].components.no2;
    document.querySelector('#pm10').innerHTML = 'pm10 levels ' + json.list[0].components.pm10;
    document.querySelector('#o3').innerHTML = 'O3 levels ' + json.list[0].components.o3;
    // json.list.components
  }

  https://api.openweathermap.org/data/2.5/air_pollution?lat=47.6062&lon=-122.3321&appid=aac56d8ba335e529dfa836fcfbfb5d1d

function renderWeather(json) {
  lat = json.coord.lat;
  lon = json.coord.lon;
  
  console.log(json);
  let notify = document.getElementById("err");

  if (!json.main) {
    notify.innerHTML = "City not recognized, Please verify spelling or try another City";
    notify.style.display = "block"; }
    else {notify.style.display = "none"; }


  storage = json
    const div = document.querySelector('#main');

    
        document.querySelector('#temp').innerHTML = Math.floor(json.main.temp) + " °F";
        document.querySelector('#weather').innerHTML = json.weather[0].description;
        document.querySelector('#weatherIcon').src = '/img/' + json.weather[0].icon + '.png';
        document.querySelector('#feels').innerHTML = "Feels like " + Math.floor(json.main.feels_like) + " °F";
        document.querySelector('#tempMax').innerHTML = "High Tempature of " + Math.floor(json.main.temp_max) + "  °F";
        document.querySelector('#tempLow').innerHTML = "Low Tempature of " + Math.floor(json.main.temp_min) + "  °F";
        if (json.wind.gust > 0) {
        document.querySelector('#windSpeed').innerHTML = "Average wind speed of " + Math.floor(json.wind.speed) + " mph, with gusts up to " + Math.floor(json.wind.gust) + " mph"; }
        else {document.querySelector('#windSpeed').innerHTML = "Average wind speed of " + Math.floor(json.wind.speed) + " mph." }
        document.querySelector('#humidity').innerHTML = "Humidity at " + json.main.humidity + "%";
        
    
        recommend();
        windAlert();
        renderDark();
        renderLight();
        if (IsDarkmode)
       {document.getElementById('main').style.backgroundColor = '#202020';}
        
      }





    function recommend() {
      const topBar = document.querySelector('.header')
    
      if (storage.main.temp <= 32) {
        topBar.innerHTML = `${weatherLocation} ` + "Current Weather Report. Watch out for icy roads!";
        document.getElementById('main').style.backgroundColor = '#ACE3E8';
      } if (storage.main.temp > 32 && storage.main.temp < 40) {
        topBar.innerHTML = `${weatherLocation} ` + "Current Weather Report. It's cold Outside!";
        document.getElementById('main').style.backgroundColor = '#d4d4d4';
      } if (storage.main.temp >= 40 && storage.main.temp < 60) {
        topBar.innerHTML = `${weatherLocation} ` + "Current Weather Report. It's chilly outside!";
        document.getElementById('main').style.backgroundColor = '#d4d4d4';
      }  if (storage.main.temp >= 60 && storage.main.temp <= 67) {
        topBar.innerHTML = `${weatherLocation} ` + "Current Weather Report. Mild temperatures";
        document.getElementById('main').style.backgroundColor = '#d4d4d4';
      } if (storage.main.temp >= 71 && storage.main.temp < 80) {
        topBar.innerHTML = `${weatherLocation} ` + "Current Weather Report. Nice warm weather!";
        document.getElementById('main').style.backgroundColor = '#d4d4d4';
      } if (storage.main.temp >= 80 && storage.main.temp <= 90) {
        topBar.innerHTML = `${weatherLocation} ` + "Current Weather Report. It's hot outside!";
        document.getElementById('main').style.backgroundColor = '#d4d4d4';
      } if (storage.main.temp >= 90 && storage.main.temp <= 110) {
        topBar.innerHTML = `${weatherLocation} ` + "Current Weather Report. It's very hot outside, stay hydrated!";
        document.getElementById('main').style.backgroundColor = '#F73718';
      }
    }

    function windAlert() {
      if (storage.wind.speed > 40) {
        document.getElementById('middle').style.backgroundColor = '#FC342A';
      }
    }
    

    function renderDark() {
      document.getElementById('darkBtn').addEventListener("click", () => darkMode());
      }
      function darkMode() {
        document.getElementById('main').style.backgroundColor = '#202020';
        document.getElementById('main').style.color = 'white';
        document.getElementById('middle').style.backgroundColor = '#202020';
        document.getElementById('middle').style.color = 'white';
        document.getElementById('right').style.backgroundColor = '#202020';
        document.getElementById('right').style.color = 'white';
        document.getElementById('container').style.backgroundColor = '#202020';
        document.getElementById('textLocation').style.backgroundColor = '#202020';
        document.getElementById('textLocation').style.color = 'white';
        document.getElementById('darkBtn').style.backgroundColor = '#202020';
        document.getElementById('darkBtn').style.color = 'white';
        document.getElementById('lightBtn').style.backgroundColor = '#202020';
        document.getElementById('lightBtn').style.color = 'white';
        document.getElementById('button1').style.backgroundColor = '#202020';
        document.getElementById('button1').style.color = 'white';
        (IsDarkmode = true)
        
        
      }

      function renderLight() {
        document.getElementById('lightBtn').addEventListener("click", () => lightMode());
      }
      function lightMode() {
        document.getElementById('main').style.backgroundColor = '#d4d4d4';
        document.getElementById('main').style.color = 'black';
        document.getElementById('middle').style.backgroundColor = '#d4d4d4';
        document.getElementById('middle').style.color = 'black';
        document.getElementById('right').style.backgroundColor = '#d4d4d4';
        document.getElementById('right').style.color = 'black';
        document.getElementById('container').style.backgroundColor = '#5F8DF0';
        document.getElementById('textLocation').style.backgroundColor = '#FFFFFF';
        document.getElementById('textLocation').style.color = 'black';
        document.getElementById('darkBtn').style.backgroundColor = '#FFFFFF';
        document.getElementById('darkBtn').style.color = 'black';
        document.getElementById('lightBtn').style.backgroundColor = '#FFFFFF';
        document.getElementById('lightBtn').style.color = 'black';
        document.getElementById('button1').style.backgroundColor = '#FFFFFF';
        document.getElementById('button1').style.color = 'black';
        (IsDarkmode = false)
      }

     
    function renderLike() {
      document.getElementById('button1').addEventListener('click', () => liker());
    }
     
    function liker() {
       let numbers = document.querySelector('#likes');
          numbers.innerHTML = parseInt(numbers.innerHTML) + 1;
        }

    function changeLocation(event) {
      event.preventDefault();

      let input = event.target.textLocation.value;
      weatherLocation = `${input} `;
      
      
      fetchWeather();

      event.target.textLocation.value = ''
      console.log(weatherLocation)
    }


     
  fetchWeather();
  fetchPolutionReport();