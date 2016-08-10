function BicycleChecker() {
}

BicycleChecker.prototype.getBicycle = function(bikeZip) {
 $.get('https://bikeindex.org:443/api/v2/bikes_search/stolen?page=1&proximity=' + bikeZip).then(function(response) {
   console.log(response);
 }).fail(function(error) {
   $('.results').text('didnt work')
 });
}

exports.bicycleModule = BicycleChecker;

function Weather() {
}

Weather.prototype.getWeather = function(city) {
  $.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey).then(function(response) {
    $('.showWeather').text('The humidity in ' + city + ' is ' + response.main.humidity + "%");
  }).fail(function(error) {
    $('.showWeather').text("Whoops");
  });
}

exports.weatherModule = Weather;
