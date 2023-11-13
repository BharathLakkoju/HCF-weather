const _apiKey = "f16bda12b7cedd807b37b7bb15e9994b";
const _url = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const searchbox = document.querySelector('.search-bar input');
const searchbtn = document.querySelector('.search-bar button');
async function checkWeather(_cityName) {
  const response = await fetch(_url + `&appid=${_apiKey}` + `&q=${_cityName}`);
  if (response.status == 404) {
    document.querySelector('.error').style.display = 'block';
    document.querySelector('.show-case').style.display = 'none';
  } else {
    var data = await response.json();
    var city = data.name;
    document.querySelector('.error').style.display = 'none';
    document.querySelector('.show-case').style.display = 'flex';
    document.querySelector('.city').innerHTML = city;
    document.querySelector('.temperature').innerHTML = data.main.temp + " C - " + data.weather[0].main;
    document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
    document.querySelector('.windspeed').innerHTML = data.wind.speed + " KM/H";
    const weatherVid = document.querySelector('.video-container video');
    if (data.weather[0].id > 800 && data.weather[0].id < 900) {
      //clouds
      weatherVid.src = "./videos/clouds.mp4";
    } else if (data.weather[0].id > 700 && data.weather[0].id < 800) {
      //mist
      weatherVid.src = "./videos/mist.mp4";
    } else if (data.weather[0].id >= 500 && data.weather[0].id < 502) {
      //slight rain
      weatherVid.src = "./videos/slightrain.mp4";
    } else if (data.weather[0].id >= 502 && data.weather[0].id < 600) {
      //heavy rain
      weatherVid.src = "./videos/rain.mp4";
    } else if (data.weather[0].id == 800) {
      //clear
      weatherVid.src = "./videos/clear.mp4";
    } else if (data.weather[0].id >= 600 && data.weather[0].id < 700) {
      //snow 
      weatherVid.src = "./videos/snow.mp4";
    } else if (data.weather[0].id >= 200 && data.weather[0].id < 300) {
      //thunderstorm
      weatherVid.src = "./videos/thunderstorm.mp4";
    }
  }
}
searchbtn.addEventListener("click", () => {
  checkWeather(searchbox.value);
})