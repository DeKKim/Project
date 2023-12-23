const apiKey = "3ff267073bb988dd26c27faa0aeb193d";
const weatherIcon = document.getElementById("weather-icon");
const cityElement = document.getElementById("city");
const temperatureElement = document.getElementById("temperature");
const conditionsText = document.getElementById("conditions-text");
const background = document.querySelector(".background");

function getWeather(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(response => {
      if (!response.ok) {
        console.error("API failed", response.status);
        throw new Error("API failed");
      }
      return response.json();
    })
    .then(data => {
      const { main, weather } = data;
      const temperature = Math.round(main.temp - 273.15);
      const conditions = weather[0].description;
      const iconCode = weather[0].icon;

      cityElement.textContent = city;
      temperatureElement.textContent = `${temperature}°C`;
      conditionsText.textContent = conditions;
      weatherIcon.className = `fas fa-${iconCode}`;

      
      changeBackground(conditions.toLowerCase());
    })
    .catch(error => {
      console.error("Error", error);
      alert("ERROR");
    });
}

function changeBackground(conditions) {
  if (conditions.includes("rain")) {
    background.style.background = "url('rain.gif') no-repeat center center fixed";
    background.style.backgroundSize = "cover";
  } else if (conditions.includes("clear")) {
    background.style.background = "url('sun.gif') no-repeat center center fixed";
    background.style.backgroundSize = "cover";
  } else if (conditions.includes("cloud") || conditions.includes("overcast")) {
    background.style.background = "url('clouds.gif') no-repeat center center fixed";
    background.style.backgroundSize = "cover";
  } else if (conditions.includes("snow")) {
    background.style.background = "url('snow.gif') no-repeat center center fixed";
    background.style.backgroundSize = "cover";
  } else {
    background.style.background = "#a0e6e6"; 
  }
}


const getWeatherButton = document.getElementById("get-weather");
getWeatherButton.addEventListener("click", () => {
  const city = document.getElementById("location-input").value;
  getWeather(city);
});