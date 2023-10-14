function getWeather() {
  let city = document.getElementById("input").value;
  let apiKey = "67db09b1ad305f07ce9ee79080816c10";

  // Check if the city is already in the cards
  let existingCards = document.querySelectorAll(".card");
  for (let card of existingCards) {
    if (card.getAttribute("data-city").toLowerCase() === city.toLowerCase()) {
      // City already exists in the cards
      displayMessage(`Weather data for "${city}" is already available.`);
      return;
    }
  }

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  if (city != "") {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const weatherCondition = data.weather[0].main;
        const weatherIcon = getWeatherIcon(data.weather[0].icon);
        const temperature = `${data.main.temp}°C`;
        const windSpeed = `${data.wind.speed} m/s`;
        const weatherDescription = data.weather[0].description;

        const weatherInfo = `<div class="card" data-city="${city}" data-weather="${weatherCondition}">
                                      ${weatherIcon}
                                      <div class="head">
                                          <h3>${data.name}, ${data.sys.country}</h3>
                                      </div>
                                      <div class="weather" style="text-align: center;">
                                          <p class="temperature">${temperature}</p>
                                          <p class="wind-speed">${windSpeed}</p>
                                      </div>
                                      <div class="description">
                                          <p>${weatherDescription}</p>
                                      </div>
                                  </div>`;

        document.querySelector(".cards").innerHTML += weatherInfo;
      })
      .catch((error) => console.error(error));
  }
  document.querySelector("input").value = "";
  document.getElementById("suggestions").innerHTML = "";
}

function displayMessage(message) {
  // Create a new paragraph element
  let paragraph = document.createElement("p");
  paragraph.textContent = message;

  // Apply styles to the paragraph
  paragraph.style.backgroundColor = "#f2f2f2";
  paragraph.style.color = "#333";
  paragraph.style.padding = "10px";
  paragraph.style.borderRadius = "5px";
  paragraph.style.textAlign = "center";
  paragraph.style.marginBottom = "10px";

  // Append the paragraph to the suggestions container
  let suggestionsContainer = document.getElementById("suggestions");
  suggestionsContainer.appendChild(paragraph);

  // Set a timeout to hide the paragraph after 2 seconds
  setTimeout(function () {
    paragraph.style.display = "none";
  }, 2000); // 2000 milliseconds (2 seconds)
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
