var cntry = document.getElementById("country");
var icon = document.getElementById("weatherImg");
var search = document.getElementById("search");
var searchInput = document.getElementById("searchInput");
var temperature = document.getElementById("temperature");
var summary = document.getElementById("discription");
var feels = document.getElementById("feels");
var humid = document.getElementById("humidity");
var wind = document.getElementById("wind");
var citty = document.getElementById("city");
var visiblity = document.getElementById("visibility");

search.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(searchInput.value);
  searchInput.value = ""; 
});

const getWeather = (city) => {
    const url = `https://v1.nocodeapi.com/shikha/ow/WnlHWjvwuAwlwMPG/byCityName/threeHourForecast?q=${city}`
    fetch(url).then((response) => {return response.json()}).then((weatherData)=>{

    const { country, name } = weatherData.city;
    const { temp, feels_like, humidity } = weatherData.list[0].main;
    const { visibility } = weatherData.list[0];
    const { speed } = weatherData.list[0].wind;
    var { description, id } = weatherData.list[0].weather[0];
    summary.innerText = description.toUpperCase();
    temperature.innerText = Math.round(temp - 273);
    feels.innerText = Math.round(feels_like - 273);
    humid.innerText = humidity;
    wind.innerText = speed;
    citty.innerText = name;
    cntry.innerText = country;
    visiblity.innerText = visibility;
console.log(id)
    if (id < 300 && id >= 200) {
      icon.src = "thunder.png";
    } else if (id < 400 && id >= 300) {
      icon.src = "drizzle.png";
    } else if (id < 600 && id >= 500) {
      icon.src = "rain.png";
    } else if (id < 700 && id >= 600) {
      icon.src = "snow.png";
    } else if (id < 800 && id >= 700) {
      icon.src = "atmos.png";
    } else if (id < 900 && id > 800) {
      icon.src = "clouds.png";
    } else if (id == 800) {
      icon.src = "clear_sky.png";
    } 
    }).catch((err) => {
      alert("Oops! City Not Found");
    })
  }

window.addEventListener("load", () => {
  var long;
  var lat;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      var api = `https://v1.nocodeapi.com/shikha/ow/WnlHWjvwuAwlwMPG/byGeoCord?lat=${lat}&long=${long}`;
      fetch(api)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const { country } = data.sys;
          const { temp, feels_like, humidity } = data.main;
          const { speed } = data.wind;
          var { description, id } = data.weather[0];
          summary.innerText = description.toUpperCase();
          cntry.innerText = country;
          temperature.innerText = Math.round(temp - 273);
          feels.innerText = Math.round(feels_like - 273);
          humid.innerText = humidity;
          wind.innerText = speed;
          citty.innerText = data.name;
          visiblity.innerText = data.visibility;

    if (id < 300 && id >= 200) {
      icon.src = "thunder.png";
    } else if (id < 400 && id >= 300) {
      icon.src = "drizzle.png";
    } else if (id < 600 && id >= 500) {
      icon.src = "rain.png";
    } else if (id < 700 && id >= 600) {
      icon.src = "snow.png";
    } else if (id < 800 && id >= 700) {
      icon.src = "atmos.png";
    } else if (id < 900 && id > 800) {
      icon.src = "clouds.png";
    } else if (id == 800) {
      icon.src = "clear_sky.png";
    }
    console.log(id)
}).catch((err) => {
    alert("Oops! Location Disabled");
    });
  });
}
});
