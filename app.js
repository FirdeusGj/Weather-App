const input = document.querySelector("input");
const locationNav = document.querySelector('.nav__p')
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
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${inputSearch}&appid=22a10d8913927bd9b9c38ed8d772ea60`
  )
    .then((response) => response.json())
    .then((data) => {
      let weather = data.weather;
      let temp = data.main;
      let wind = data.wind;
      let name = data.name;

      console.log(weather, temp, wind, name);
    });
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
