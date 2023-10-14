function getWeather() {
  let city = document.getElementById("input").value;
  let apiKey = "67db09b1ad305f07ce9ee79080816c10";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  if (city != "") {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const weatherCondition = data.weather[0].main;
        const weatherIcon = getWeatherIcon(data.weather[0].icon);
        const temperature = `${data.main.temp}°C`;
        const windSpeed = `${data.wind.speed} m/s`;
        const windIcon = '<i class="fas fa-wind"></i>'; // Font Awesome wind icon
        const desc = data.weather[0].description;

        const weatherInfo = `<div class="card" data-weather="${weatherCondition}">
                                      ${weatherIcon}
                                      <div class="head">
                                          <h3>${data.name}, ${data.sys.country}</h3>
                                      </div>
                                      <div class="weather" style="text-align: center;">
                                          <p class="temperature">${temperature}</p>
                                          <p class="wind-speed">${windIcon} ${windSpeed}</p>
                                          <p class="desc">${desc}</p>
                                      </div>
                                  </div>`;

        document.querySelector(".cards").innerHTML += weatherInfo;
      })
      .catch((error) => console.error(error));
  }
  document.querySelector("input").value = "";
  document.getElementById("suggestions").innerHTML = "";
}
function getWeatherIcon(iconCode) {
  let iconClass = "";
  let iconColor = "";
  if (iconCode.includes("01")) {
    // Clear sky
    iconClass = "fas fa-sun";
    iconColor = "yellow";
  } else if (
    iconCode.includes("02") ||
    iconCode.includes("03") ||
    iconCode.includes("04")
  ) {
    // Clouds
    iconClass = "fas fa-cloud";
    iconColor = "gray"; // Change the color of the cloud icon
  } else if (iconCode.includes("09") || iconCode.includes("10")) {
    // Rain
    iconClass = "fas fa-cloud-showers-heavy";
    iconColor = "blue"; // Change the color of the raining icon
  } else if (iconCode.includes("11")) {
    // Thunderstorm
    iconClass = "fas fa-bolt";
    iconColor = "purple";
  } else if (iconCode.includes("13")) {
    // Snow
    iconClass = "fas fa-snowflake";
    iconColor = "white";
  } else if (iconCode.includes("50")) {
    // Mist
    iconClass = "fas fa-smog";
    iconColor = "gray";
  }

  return `<i class="${iconClass} weather-icon" style="font-size: 50px; color: ${iconColor}; display: block; margin: 0 auto;"></i>`;
}
