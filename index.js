

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector('#changeLocationForm').addEventListener("submit", (event) => changeLocation(event));
  renderLike();
})
let storage;
let weatherLocation = 'Seattle';
let IsDarkmode = false;
let lat = 47.6062;
let lon = -122.3321;


function fetchWeather() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + weatherLocation + '&units=imperial&appid=aac56d8ba335e529dfa836fcfbfb5d1d')
    .then(response => response.json())
    .then(data => renderWeather(data));
  
    
  }

  function fetchPollutionReport() {
    fetch('https://api.openweathermap.org/data/2.5/air_pollution?lat=' + lat + '&lon=' + lon + '&appid=aac56d8ba335e529dfa836fcfbfb5d1d')
    // fetch('https://api.openweathermap.org/data/2.5/air_pollution?lat=47.6062&lon=-122.3321&appid=aac56d8ba335e529dfa836fcfbfb5d1d')
    .then(response => response.json())
    .then(data => renderPollution(data));
    
  }

  function renderPollution(json) {
    console.log(json);
    storage = json
    


    if (json.list[0].main.aqi === 1) {
    document.querySelector('#airQ').innerHTML = "Air Quality is Good";
    document.querySelector('#airQ').style.backgroundColor = 'green';
    }
    if (json.list[0].main.aqi === 2) {
      document.querySelector('#airQ').innerHTML = "Air Quality is Fair";
     document.querySelector('#airQ').style.backgroundColor =  '#6c0';
      }
    if (json.list[0].main.aqi === 3) {
        document.querySelector('#airQ').innerHTML = "Air Quality is Moderate";
        document.querySelector('#airQ').style.backgroundColor = '#ff0';
      }
    if (json.list[0].main.aqi === 4) {
        document.querySelector('#airQ').innerHTML = "Air Quality is Poor";
        document.querySelector('#airQ').style.backgroundColor = '#f90';
      }  
    if (json.list[0].main.aqi === 5) {
        document.querySelector('#airQ').innerHTML = "Air Quality is Very Poor";
        document.querySelector('#airQ').style.backgroundColor =  'red';
      }
    if (!json.list[0].main.aqi >= 1 && json.list[0].main.aqi <= 5) {document.querySelector('#airQ').innerHTML = "Air Quality is unavailable at this time"}

    document.querySelector('#no2').innerHTML = 'NO2 level: ' + json.list[0].components.no2 + ' μg/m3';
      if (json.list[0].components.no2 >= 0 && json.list[0].components.no2 <= 50) {
        document.getElementById('no2').style.color = 'green'
      }
      if (json.list[0].components.no2 > 50 && json.list[0].components.no2 <= 100) {
        document.getElementById('no2').style.color = '#6c0'
      }
      if (json.list[0].components.no2 > 100 && json.list[0].components.no2 <= 200) {
        document.getElementById('no2').style.color = '#ff0'
      }
      if (json.list[0].components.no2 > 200 && json.list[0].components.no2 <= 400) {
        document.getElementById('no2').style.color = '#f90'
      }
      if (json.list[0].components.no2 > 400) {
        document.getElementById('no2').style.color = 'red'
      }

    document.querySelector('#pm10').innerHTML = 'pm10 level: ' + json.list[0].components.pm10 + ' μg/m3';

      if (json.list[0].components.pm10 >= 0 && json.list[0].components.pm10 <= 25) {
        document.getElementById('pm10').style.color = 'green'
      }
      if (json.list[0].components.pm10 > 25 && json.list[0].components.pm10 <= 50) {
        document.getElementById('pm10').style.color = '#6c0'
      }
      if (json.list[0].components.pm10 > 50 && json.list[0].components.pm10 <= 90) {
        document.getElementById('pm10').style.color = '#ff0'
      }
      if (json.list[0].components.pm10 > 90 && json.list[0].components.pm10 <= 180) {
        document.getElementById('pm10').style.color = '#f90'
      }
      if (json.list[0].components.pm10 > 180) {
        document.getElementById('pm10').style.color = '#red'
      }

    document.querySelector('#o3').innerHTML = 'O3 level: ' + json.list[0].components.o3 + ' μg/m3';
    
    if (json.list[0].components.o3 >= 0 && json.list[0].components.o3 <= 60) {
      document.getElementById('o3').style.color = 'green'
    }
    if (json.list[0].components.o3 > 60 && json.list[0].components.o3 <= 120) {
      document.getElementById('o3').style.color = '#6c0'
    }
    if (json.list[0].components.o3 > 120 && json.list[0].components.o3 <= 180) {
      document.getElementById('o3').style.color = '#ff0'
    }
    if (json.list[0].components.o3 > 180 && json.list[0].components.o3 <= 240) {
      document.getElementById('o3').style.color = '#f90'
    }
    if (json.list[0].components.o3 > 240) {
      document.getElementById('o3').style.color = 'red'
    }
    

  }

 

function renderWeather(json) {


  
  
  console.log(json);
  let notify = document.getElementById("err");

  if (!json.main) {
    notify.innerHTML = "City not recognized, Please verify spelling or try another City";
    notify.style.display = "block"; }
    else {notify.style.display = "none";
    lat = json.coord.lat;
    lon = json.coord.lon;
 }

  storage = json
  weathericon = document.querySelector('#weatherIcon');
  jsonIcon = json.weather[0].icon;
    
        document.querySelector('#temp').innerHTML = Math.floor(json.main.temp) + " °F";
        document.querySelector('#weather').innerHTML = json.weather[0].description;
        weathericon.src = '/img/' + json.weather[0].icon + '.png';
        if (jsonIcon === '01d') {
          weathericon.alt = "Clear sky icon"
        }
        if (jsonIcon === '01n') {
          weathericon.alt = "Clear sky night icon"
        }
        if (jsonIcon === '02d') {
          weathericon.alt = "Few clouds icon"
        }
        if (jsonIcon === '02n') {
          weathericon.alt = "Few clouds night icon"
        }
        if (jsonIcon === '03d') {
          weathericon.alt = "Scattered clouds icon"
        }
        if (jsonIcon === '03n') {
          weathericon.alt = "Scattered clouds night icon"
        }
        if (jsonIcon === '04d') {
          weathericon.alt = "Broken clouds icon"
        }
        if (jsonIcon === '04n') {
          weathericon.alt = "Broken clouds night icon"
        }  
        if (jsonIcon === '09d') {
          weathericon.alt = "Shower rain icon"
        }
        if (jsonIcon === '09n') {
          weathericon.alt = "Shower rain night icon"
        }
        if (jsonIcon === '10d') {
          weathericon.alt = "Rain icon"
        }
        if (jsonIcon === '10n') {
          weathericon.alt = "Rain night icon"
        }
        if (jsonIcon === '11d') {
          weathericon.alt = "Thunderstorm icon"
        }
        if (jsonIcon === '11n') {
          weathericon.alt = "Thunderstorm night icon"
        }
        if (jsonIcon === '13d') {
          weathericon.alt = "Snow icon"
        }
        if (jsonIcon === '13n') {
          weathericon.alt = "Snow night icon"
        }
        if (jsonIcon === '50d') {
          weathericon.alt = "Mist icon"
        }
        if (jsonIcon === '50n') {
          weathericon.alt = "Mist night icon"
        }
        
        document.querySelector('#feels').innerHTML = "Feels like " + Math.floor(json.main.feels_like) + " °F";
        document.querySelector('#tempMax').innerHTML = "High Tempature of " + Math.floor(json.main.temp_max) + "  °F";
        document.querySelector('#tempLow').innerHTML = "Low Tempature of " + Math.floor(json.main.temp_min) + "  °F";
        if (json.wind.gust > 0) {
        document.querySelector('#windSpeed').innerHTML = "Average wind speed of " + Math.floor(json.wind.speed) + " mph, with gusts up to " + Math.floor(json.wind.gust) + " mph"; }
        else {document.querySelector('#windSpeed').innerHTML = "Average wind speed of " + Math.floor(json.wind.speed) + " mph." }
        document.querySelector('#humidity').innerHTML = "Humidity at " + json.main.humidity + "%";
        
        fetchPollutionReport();
        recommend();
        windAlert();
        renderDark();
        renderLight();
        if (IsDarkmode)
       {document.getElementById('main').style.backgroundColor = '#202020';}
        
      }





    function recommend() {
      const topBar = document.querySelector('.header')
      let temperature = storage.main.temp
      let main = document.getElementById('main')
    console.log(weatherLocation)
      if (temperature <= 32) {
        topBar.innerHTML = `${weatherLocation} ` + "Current Weather Report. Watch out for icy roads!";
        main.style.backgroundColor = '#ACE3E8';
      } if (temperature > 32 && temperature < 40) {
        topBar.innerHTML = `${weatherLocation} ` + "Current Weather Report. It's cold Outside!";
        main.style.backgroundColor = '#d4d4d4';
      } if (temperature >= 40 && temperature < 60) {
        topBar.innerHTML = `${weatherLocation} ` + "Current Weather Report. It's chilly outside!";
        main.style.backgroundColor = '#d4d4d4';
      }  if (temperature >= 60 && temperature <= 67) {
        topBar.innerHTML = `${weatherLocation} ` + "Current Weather Report. Mild temperatures";
        main.style.backgroundColor = '#d4d4d4';
      } if (temperature >= 71 && temperature < 80) {
        topBar.innerHTML = `${weatherLocation} ` + "Current Weather Report. Nice warm weather!";
        main.style.backgroundColor = '#d4d4d4';
      } if (temperature >= 80 && temperature <= 90) {
        topBar.innerHTML = `${weatherLocation} ` + "Current Weather Report. It's hot outside!";
        main.style.backgroundColor = '#d4d4d4';
      } if (temperature >= 90) {
        topBar.innerHTML = `${weatherLocation} ` + "Current Weather Report. It's very hot outside, stay hydrated!";
        main.style.backgroundColor = '#F73718';
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
        document.getElementById('airQ').style.color = 'black';
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
      
      console.log(weatherLocation)
      fetchWeather();

      event.target.textLocation.value = ''
  
    }


     
  fetchWeather();
  fetchPollutionReport();