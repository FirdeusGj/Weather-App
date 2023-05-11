const input = document.querySelector("input");
const locationNav = document.querySelector('.nav__p')
const searchResult = document.querySelector('.search__results');

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
      console.log(data.cod)
      searchResult.innerHTML = `<p>It's ${temp}°C</p>`
    }).catch((error) => error = searchResult.innerHTML = `<p>No data</p>` );
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
