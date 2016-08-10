var BicycleChecker = require('./../js/bicycleChecker.js').bicycleModule;

$(document).ready(function() {
  var currentBicycleObject = new BicycleChecker();
  $('#submit-button').click(function() {
    var bikeZip = $('#bike-zip').val();
    // var bikeRadius = $('#bike-radius').val();
    $('#bike-zip').val("");
    // $('#bike-radius').val("");
    currentBicycleObject.getBicycle(bikeZip)
  });
});
