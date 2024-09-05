const apiKey = "f36820d2ed117c733f0924ee65900b00";
const weatherContainer = document.querySelector(".weather-info");
const cityInput = document.querySelector("#city-input");
const searchButton = document.querySelector("#search-button");

async function fetchWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    updateWeatherInfo(data);
  } catch (error) {
    alert(error.message);
  }
}

function updateWeatherInfo(data) {
  document.querySelector(".city-name").textContent = data.name;
  document.querySelector(".country").textContent = data.sys.country;
  document.querySelector(".temperature").textContent = `${Math.round(
    data.main.temp
  )} °C`;
  document.querySelector("#description").textContent =
    data.weather[0].description;
  document.querySelector("#wind").textContent = `${data.wind.speed} m/s`;
  document.querySelector("#humidity").textContent = `${data.main.humidity} %`;
}

searchButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeatherData(city);
  }
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchButton.click();
  }
});
