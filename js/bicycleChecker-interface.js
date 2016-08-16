var BicycleChecker = require('./../js/bicycleChecker.js').bicycleModule;

$(document).ready(function() {
  var currentBicycleObject = new BicycleChecker();
  $('#submit-button').click(function() {
    $('#title').empty();
    var bikeZip = $('#bike-zip').val();
    var bikeRadius = $('#bike-radius').val();
    var bikeColor = $('#bike-color').val();
    var bikeManu = $('#bike-manufacturer').val();



    var dateBefore = new Date($('#date-before').val()).getTime() /1000;
    console.log(dateBefore);



    var dateAfter = new Date($('#date-after').val()).getTime() /1000;
    console.log(dateAfter);



    $('#bike-zip').val("");
    $('#bike-radius').val("");
    $('#bike-color').val("");
    $('#bike-manufacturer').val("");
    $('#title').append("Bikes stolen within " + bikeRadius + " miles of " + bikeZip);
    currentBicycleObject.getBicycle(bikeZip, bikeRadius, bikeColor, bikeManu, dateBefore, dateAfter)
  });
});
