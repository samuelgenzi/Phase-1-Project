// Define constants for API URL and API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=sydney&appid=3d3b7fc3ef1ccb996dfd9a99c3aeceda&units=metric';
const apiKey = '3d3b7fc3ef1ccb996dfd9a99c3aeceda'; 

// Get the necessary HTML elements
const searchInput = document.getElementById('my-input');
const searchButton = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temp');
const city = document.querySelector('.city');
const windSpeed = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

// Function to fetch weather data from the API
async function getWeatherData(cityName) {
  try {
    const response = await fetch(`${apiUrl}&q=${cityName}&appid=${apiKey}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}

// Function to update the weather information in the HTML
function updateWeatherInfo(data) {
  console.log(data); // Log the data object to the console for inspection

  if (data) {
    weatherIcon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    temperature.textContent = `${data.main.temp}°C`;
    city.textContent = data.name;
    windSpeed.textContent = `${data.wind.speed} m/s`;
    humidity.textContent = `${data.main.humidity}%`;
  }
}


// Function to handle the search button click event
function handleSearch() {
  const cityName = searchInput.value.trim();
  if (cityName !== '') {
    getWeatherData(cityName)
      .then(updateWeatherInfo)
      .catch(error => console.error('Error fetching weather data:', error));
  }
}

// Event listener for the search button click event
searchButton.addEventListener('click', handleSearch);

// Event listener for the Enter key press event in the search input
searchInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    handleSearch();
  }
});

// Initial weather data for Sydney
getWeatherData('Sydney')
  .then(updateWeatherInfo)
  .catch(error => console.error('Error fetching initial weather data:', error));
