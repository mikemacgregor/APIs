// COMP1073 Assignment 5, To-Do List w/ APIs
// Mike MacGregor #200232817
// April 9, 2020

// get location
if(navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(fetchWeather); // change function to showPosition to test

} else {
	// keeps the default text in weather box to allow location services in browser

}

// display lat and long in console
function showPosition(position) {
	console.log(position.coords.latitude);
	console.log(position.coords.longitude);
}

// use promises, fetch weather data from API and display
function fetchWeather(position) {
	fetch("https://community-open-weather-map.p.rapidapi.com/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&id=2172797&lang=en&units=metric", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
			"x-rapidapi-key": "a2e8aacb77msh3d9e9bcbb12de4fp1e0728jsn9bc04f3ef1c2"
		}
	})
	.then(function(response) { // initial request, receive response
	  return response.json();
	}).then(function(json) {
	  weatherData = json; // response to a json object
	}).then(function() {
	  weatherOutput(weatherData); // call function to display info from json object
	}).catch(function(err) {
	  console.log('Problem: ' + err.message);
	});
}

// display the info
function weatherOutput(weatherData) {
	// console.log(weatherData);

	let weather = document.getElementById('weather');
	weather.innerHTML = '';

	// city = name
	// description = weather[0].description
	// icon = weather[0].icon
	// temperature = main.temp

	let addWeatherIcon = document.createElement('img');
	addWeatherIcon.setAttribute('src', 'http://openweathermap.org/img/wn/' + weatherData.weather[0].icon + '@2x.png');
	addWeatherIcon.setAttribute('class', 'float-right');

	let addWeatherCity = document.createElement('h2');
  let addWeatherCityText = document.createTextNode(weatherData.name);
	addWeatherCity.appendChild(addWeatherCityText);

	let addWeatherDescription = document.createElement('h5');
	let addWeatherDescriptionText = document.createTextNode(weatherData.weather[0].description);
	addWeatherDescription.appendChild(addWeatherDescriptionText);

	let addWeatherTemp = document.createElement('h3');
	let addWeatherTempText = document.createTextNode(Math.round(weatherData.main.temp, 0) + ' \u2103'); // U+2103 = degrees C
	addWeatherTemp.appendChild(addWeatherTempText);

	weather.appendChild(addWeatherIcon);
	weather.appendChild(addWeatherCity);
	weather.appendChild(addWeatherDescription);
	weather.appendChild(addWeatherTemp);

}

/* sample response
{
  "coord": {
    "lon": -79.62,
    "lat": 44.36
  },
  "weather": [
    {
      "id": 803,
      "main": "Clouds",
      "description": "broken clouds",
      "icon": "04d" // --> use http://openweathermap.org/img/wn/10d@2x.png
    }
  ],
  "base": "stations",
  "main": {
    "temp": 5.14,
    "feels_like": -2.27,
    "temp_min": 3.33,
    "temp_max": 7.78,
    "pressure": 995,
    "humidity": 56
  },
  "visibility": 14484,
  "wind": {
    "speed": 7.2,
    "deg": 280,
    "gust": 14.4
  },
  "clouds": {
    "all": 75
  },
  "dt": 1586454040,
  "sys": {
    "type": 1,
    "id": 762,
    "country": "CA",
    "sunrise": 1586429041,
    "sunset": 1586476520
  },
  "timezone": -14400,
  "id": 5894171,
  "name": "Barrie",
  "cod": 200
} */
