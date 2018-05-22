let inputWeather = document.querySelector('.weather');
function initialize() {
      let autocomplete = new google.maps.places.Autocomplete(inputWeather);
   }
google.maps.event.addDomListener(window, 'load', initialize);

var APPID = "77e6549a0d6f421bbc4caa4dec3beb20";
var temp;
var loc;
var icon;
var humidity;
var wind;
var direction;

document.querySelector('.submit-weather').addEventListener('click', getWeather);

function update(weather) {
    icon.src = "images/codes/" + weather.code + ".png"
    humidity.innerHTML = weather.humidity;
    wind.innerHTML = weather.wind;
    direction.innerHTML = weather.direction;
    loc.innerHTML = weather.location;
    temp.innerHTML = weather.temp;
}

function getWeather() {
    temp = document.getElementById("temperature");
    loc = document.getElementById("location");
    icon = document.getElementById("icon");
    humidity = document.getElementById("humidity");
    wind = document.getElementById("wind");
    direction = document.getElementById("direction");
	var city = inputWeather.value.substring(0 , inputWeather.value.indexOf(','));
	updateByCity(city);
}

function updateByCity(city){
    var url = "http://api.openweathermap.org/data/2.5/weather?" +
	"q=" + city +
	"&APPID=" + APPID;
    sendRequest(url);
}

function sendRequest(url){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var data = JSON.parse(xmlhttp.responseText);
	    var weather = {};
	    weather.code = data.weather[0].id;
	    weather.humidity = data.main.humidity;
	    weather.wind = mph2kmph(data.wind.speed);
	    weather.direction = degreesToDirection(data.wind.deg)
	    weather.location = data.name;
	    weather.temp = K2C(data.main.temp);		
	    update(weather);
	}
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();    
}

function degreesToDirection(degrees){
    var range = 360/16;
    var low = 360 - range/2;
    var high = (low + range) % 360;
    var angles = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    for( i in angles ) {
	if(degrees >= low && degrees < high){
	    console.log(angles[i]);
	    return angles[i];
	    console.log("derp");
	}
	low = (low + range) % 360;
	high = (high + range) % 360;
    }
    return "N"; 
}

function mph2kmph(speed){
    return Math.round(speed * 1.60934);
}

function K2C(k){
    return Math.round(k - 273.15);
}