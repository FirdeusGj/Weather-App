const input = document.querySelector("input");
const locationNav = document.querySelector('.nav__p')
const searchResult = document.querySelector('.search__results');
const container = document.querySelector('.container');
input.addEventListener("keyup", function (e) {
  if (e.keyCode === 13) {
    weatherSearch();
  }
});
let inputSearch = "";
function inputChange(event) {
  inputSearch = event.target.value;
}
function weatherSearch() {
  if(input.value === ''){
    return searchResult.innerHTML = '<p>type something</p>'
  }
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${inputSearch}&appid=22a10d8913927bd9b9c38ed8d772ea60`
  )
    .then((response) => response.json())
    .then((data) => {
      
      let weather = data.weather[0].main;
      let weatherDesc = data.weather[0].description;
      let temp = Math.floor(data.main.temp - 273.1);
      let wind = data.wind.speed;
      let name = data.name;
      let humidity = data.main.humidity
      console.log(weather);
      console.log(weatherDesc)
      console.log(temp)
      console.log(wind)
      console.log(name)
      console.log(humidity)
      if(weather === 'Rain' || weather === 'Drizzle' || weather === 'Thunderstorm'){
        container.style.background = 'linear-gradient(white, #C4D3DF)'
      }
      if(weather === 'Clear'){
        container.style.background = 'linear-gradient(white, #9FDBE7)'
      }
      if(weather === 'Clouds'){
        container.style.background = 'linear-gradient(white, #909D9E)'
      }
      if(weather === 'Snow'){
        container.style.background = 'linear-gradient(white, #e6e6e6)'
      }
      searchResult.innerHTML = `
      <div class="searchResult__wrapper">
            <div class="result__image--wrapper">
                <img class="result__image" src="./images/${weather}.png" alt="">
            </div>
            <div class="searchResult__description--wrapper">
                <div class="searchResult__description">
                    <h2>${name}</h2>
                    <p>Weather : <span>${weather}</span> | ${weatherDesc}</p>
                    <p>Temperature : ${temp}<span>°C</span> | ${temp + 273.1}<span>K</span> | ${(temp * 9/5) + 32}<span>°F</span></p>
                    <p>Wind speed : ${wind}km/h</p>
                    <p>Humidity : ${humidity}%</p>
                </div>
            </div>
        </div>
      `
    }).catch((error) => error = searchResult.innerHTML = `
    <div class="notFound__wrapper">
      <img class="notFound" src="./images/404.png"/>
      <h1>Location not found</h1>
    </div>` );
  inputSearch = "";
  input.value = "";
}
const successCallback = (position) => {
  fetch(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=22a10d8913927bd9b9c38ed8d772ea60`
  ).then((response) => response.json())
  .then((data) => {
    let country = data[0].local_names.eu
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=22a10d8913927bd9b9c38ed8d772ea60`
      )
      .then((response) => response.json())
      .then((data) => {
        let weather1 = data.weather[0].main
        let temp = Math.floor(data.main.temp + -273.1)
        locationNav.innerHTML = `${country} | ${weather1} | ${temp}°C`
      })
    }).catch((error) => error = locationNav.innerHTML = `Location error`)
  };
const errorCallback = (error) => {
  console.log(error);
};
navigator.geolocation.watchPosition(successCallback, errorCallback);
