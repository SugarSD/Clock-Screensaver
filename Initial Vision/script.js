//Sleep Function
function sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
  }

//Capitalize First Letter Function
function capFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//Declarations
const API_key = "key"
let clock = document.querySelector(".clock");
let weathertype = document.querySelector(".weather_type");
let weatherdesc = document.querySelector(".weather_description");
let weathericon = document.querySelector(".icon");
let seconds = 0;
let minutes = 0;
let hours = 0;
let date = 0
let lat = "39.126740"
let lon = "-104.162666"

//Function that retrieves the current time and sets the given time shown on the site using "worldtimeapi.org"
async function getTime() {
    let res = await fetch(`http://worldtimeapi.org/api/timezone/America/Denver`);
    let data = await res.json()
    let { datetime } = data
    date = datetime
    console.log(date)
    seconds = date.slice(17, 19)
    minutes = date.slice(14, 16)
    hours = date.slice(11, 13)
    console.log(hours + ":" + minutes + ":" + seconds)
    let time = hours + ":" + minutes
    clock.textContent = time
}

//Function that gets the current weather information of the given location using "openweathermap.org"
async function updateWeather() {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`);
    let weatherdata = await response.json()
    let { weather } = weatherdata
    let main = capFirst(weather[0].main);
    let description = capFirst(weather[0].description)
    let rawicon = (weather[0].icon)
    console.log(rawicon)
    let icon = `http://openweathermap.org/img/wn/${rawicon}@2x.png`
    console.log(main)
    console.log(description)
    weathericon.src = icon
    weathertype.textContent = main
    weatherdesc.textContent = description
}

//Call the time function, then time it so it gets the new time every minute
const secleft = 60 - parseInt(seconds)
const timeout = (secleft * 1000)
getTime()
setTimeout(timeout)
getTime()
setInterval(getTime, 60000)

//Call the weather function, then update the weather every hour
updateWeather()
setTimeout(timeout)
setInterval(updateWeather, 600000)