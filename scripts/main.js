document.querySelector('button.search-icon-button').addEventListener('click', function() {
    document.querySelector('.search-bar').classList.toggle('active');
});

// API key and endpoint URL
let apiKey = "TWÓJ_KLUCZ_API";
let apiUrl ="https://api.openweathermap.org/data/2.5/weather?units=metric&lang=en";

// DOM elements
let searchBox = document.querySelector(".search-bar input");
let weather_icon = document.querySelector(".weather-icon-img");

function checkNight(data){

    const timezoneOffset = data.timezone; // przesunięcie czasu miasta względem UTC w sekundach
    const currentTime = Math.floor(Date.now() / 1000); // aktualny czas w formacie Unix (sekundy od 1970) w Twojej strefie czasowej
    const localTime = currentTime + timezoneOffset;

    // Pobranie czasu wschodu i zachodu słońca w formacie Unix (zawsze w UTC)
    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;

    return localTime > sunset || localTime < sunrise;
}    

// Function to check the weather for a city
async function checkWeather(city) {
    try {
        
      // Make API call to fetch weather data
      const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
      if (!response.ok) {
        throw new Error("Unable to fetch weather data.");
      }
  
      // Parse the response JSON
      const data = await response.json();
  
      // Update the DOM with weather information
      document.querySelector(".location-info").innerHTML = data.name;
      const tempCelcius = Math.round(data.main.temp);
      document.querySelector(".local-temp").innerHTML = tempCelcius + "°C";

      const isNight = checkNight(data);

      switch(data.weather[0].main){
        case "Clear":
            weather_icon.src = isNight ? "/assets/moon.png" : "/assets/sun.png"
            break;
        case "Clouds":
            if (data.clouds.all > 50) {
                weather_icon.src = "/assets/clouds.png";    
            } else {
                weather_icon.src = isNight ? "/assets/clouds_night.png" : "/assets/clouds_day.png"
            }
            break;
        case "Rain": 
            weather_icon.src = "/assets/rain.png";
            break;
        default:
      }

      console.log(data.weather[0].main);
    } catch (error) {
      // Display error message and hide weather section
      console.error(error);
    }
  }

  document.querySelector(".search-bar").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const city = searchBox.value.trim();
        if (city !== "") {
          console.log("TAK");
          checkWeather(city);
        }
    }
});
  