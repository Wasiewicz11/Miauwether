document.querySelector('button.search-icon-button').addEventListener('click', function() {
    document.querySelector('.search-bar').classList.toggle('active');
});

// API key and endpoint URL
let apiKey = "2137";
let apiUrl ="https://api.openweathermap.org/data/2.5/weather?units=metric&lang=en";

// DOM elements
let searchBox = document.querySelector(".search-bar input");
let weather_icon = document.querySelector(".weather-icon-img");

// Variable to store Celsius value
let cel;

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
  
      if(tempCelcius < 20){
        weather_icon.src = "/assets/sun.png";
    } else {
          weather_icon.src = "/assets/moon.png";
      }

      /*
    
      // Set the weather icon based on weather conditions
      if (data.weather[0].main === "Clouds") {
        weather_icon.src = "../images/clouds.png";
      } else if (data.weather[0].main === "Clear") {
        weather_icon.src = "../images/clear.png";
      } else if (data.weather[0].main === "Rain") {
        weather_icon.src = "../images/rain.png";
      } else if (data.weather[0].main === "Drizzle") {
        weather_icon.src = "../images/drizzle.png";
      } else if (data.weather[0].main === "Mist") {
        weather_icon.src = "../images/mist.png";
      }
  */

  
      // Store the Celsius value
      cel = tempCelcius;

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
  