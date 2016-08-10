$(document).ready(function() {
  $('#submit-button').click(function() {
    var bikeZip = $('#bike-zip').val();
    var bikeRadius = $('#bike-radius').val();
    $('#bike-zip').val("");
    $('#bike-radius').val("");
    console.log(bikeRadius);
    console.log(bikeZip);
  });
});


var Weather = require('./../js/weather.js').weatherModule;

$(document).ready(function() {
  var currentWeatherObject = new Weather();
  $('#weatherLocation').click(function() {
    var city = $('#location').val();
    $('#location').val("");
    currentWeatherObject.getWeather(city);
  });
});
