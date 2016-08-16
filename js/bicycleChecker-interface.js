var BicycleChecker = require('./../js/bicycleChecker.js').bicycleModule;

$(document).ready(function() {
  var currentBicycleObject = new BicycleChecker();
  $('#submit-button').click(function() {
    $('#title').empty();
    var bikeZip = $('#bike-zip').val();
    var bikeRadius = $('#bike-radius').val();
    if (bikeRadius === "") {
      bikeRadius = "10";
    }
    var bikeColor = $('#bike-color').val();
    var bikeManu = $('#bike-manufacturer').val();
    var dateBefore = $('#date-before').val()
      if (dateBefore === "") {
        dateBefore
      }
      else {
        dateBefore = (new Date($('#date-before').val()).getTime() /1000);
      }
    var dateAfter = $('#date-after').val()
      if (dateAfter === "") {
        dateAfter
      }
      else {
        dateAfter = (new Date($('#date-after').val()).getTime() /1000);
      }

    if (bikeZip === "") {
      alert("Please enter a zipcode.");
    } else {
    $('#title').append("Bikes stolen within " + bikeRadius + " miles of " + bikeZip);
    currentBicycleObject.getBicycle(bikeZip, bikeRadius, bikeColor, bikeManu, dateBefore, dateAfter)
    }

    $('#bike-zip').val("");
    $('#bike-radius').val("");
    $('#bike-color').val("");
    $('#bike-manufacturer').val("");
  });
});
