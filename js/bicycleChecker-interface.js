var BicycleChecker = require('./../js/bicycleChecker.js').bicycleModule;

$(document).ready(function() {
  var currentBicycleObject = new BicycleChecker();
  $('#submit-button').click(function() {
    $('#title').empty();
    var bikeZip = $('#bike-zip').val();
    var bikeRadius = $('#bike-radius').val();
    var bikeColor = $('#bike-color').val();
    var bikeManu = $('#bike-manufacturer').val();
    var dateBefore = $('#date-before').val();
    var dateAfter = $('#date-after').val();
    $('#bike-zip').val("");
    $('#bike-radius').val("");
    $('#bike-color').val("");
    $('#bike-manufacturer').val("");
    $('#title').append("Bikes stolen within " + bikeRadius + " miles of " + bikeZip);
    currentBicycleObject.getBicycle(bikeZip, bikeRadius, bikeColor, bikeManu, dateBefore, dateAfter)
  });
});
