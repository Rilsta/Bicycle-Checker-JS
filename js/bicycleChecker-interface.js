var BicycleChecker = require('./../js/bicycleChecker.js').bicycleModule;

$(document).ready(function() {
  var currentBicycleObject = new BicycleChecker();
  $('#submit-button').click(function() {
    var bikeZip = $('#bike-zip').val();
    var bikeRadius = $('#bike-radius').val();
    var bikeColor = $('#bike-color').val();
    $('#bike-zip').val("");
    $('#bike-radius').val("");
    $('#bike-color').val("");
    $('#title').append("Bikes stolen within " + bikeRadius + " miles of " + bikeZip);
    currentBicycleObject.getBicycle(bikeZip, bikeRadius, bikeColor)
  });
});
