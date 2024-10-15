
let cityName = document.querySelector(".weather__input");
let apiKey = "b61740fd446e09d6b26491282b44afda";

let container = document.querySelector(".container");
let displayCity = container.querySelector(".city__name");
let displayTemp = container.querySelector(".temp");
let displayDesc = container.querySelector(".desc");
let displayWeatherEmoji = container.querySelector(".weather__emoji");
let displayHumidity = container.querySelector(".humidity");
let errorDisplay = document.querySelector(".error");


document.addEventListener("keydown", async key => {

  if (key.code == "Enter") {
    
    if (cityName.value) {

      try {

        // Take data from input
        let data = await fetchData(cityName.value);

        displayData(data);

      }
      catch (error) {
        console.log(error);
        displayError(error);
      }
    }
    else {
      displayError("Please enter a city")
    }
  }

})

async function fetchData(city) {

  errorDisplay.textContent = "";

  // HTTP request
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

  let response = await fetch(apiURL);

  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  };

  return await response.json();
}

function displayData(data) {

  // Take data from JSON
  let { name: city,
    main: { temp, humidity },
    weather: [{ description, id }]
  } = data;

  // Show new info
  displayCity.textContent = city;
  displayTemp.textContent = `${Math.floor(temp - 273.15)}°C`;
  displayDesc.textContent = description.charAt(0).toUpperCase() + description.slice(1);
  displayWeatherEmoji.textContent = getWeatherEmoji(id);
  displayHumidity.textContent = `Humidity: ${humidity}`;

  container.classList.add("active");

}

function getWeatherEmoji(id) {

  if (id >= 200 && id < 300)
    return "⛈️";

  if (id >= 300 && id < 400)
    return "🌧️";

  if (id >= 500 && id < 600)
    return "🌧️";

  if (id >= 600 && id < 700)
    return "❄️";

  if (id >= 700 && id < 800)
    return "🌫️";

  if (id == 800)
    return "☀️";

  if (id >= 800 && id < 805)
    return "☁️";
}

function displayError(message) {
  errorDisplay.textContent = message;
}