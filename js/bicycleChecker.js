function BicycleChecker() {
}




BicycleChecker.prototype.getBicycle = function(bikeZip, bikeRadius, bikeColor, bikeManu, dateBefore, dateAfter) {


  /*Bike Count Get Request*/
  $.get('https://bikeindex.org:443/api/v2/bikes_search/count?page=1&proximity=' + bikeZip +
        '&proximity_square=' + bikeRadius +
        '&colors=' + bikeColor +
        '&manufacturer=' + bikeManu  +
        '&stolen_before=' + dateBefore +
        '&stolen_after=' + dateAfter).then(function(response) {
    $('#number-stolen').empty();
    $('#number-stolen').append(response.proximity + " total stolen.");
  }).fail(function(error) {
    $('.results').text('didnt work');
  });

  /*Bike Info Get Request*/
  $.get('https://bikeindex.org:443/api/v2/bikes_search/stolen?page=1&proximity=' + bikeZip +
        '&proximity_square=' + bikeRadius +
        '&colors=' + bikeColor +
        '&manufacturer=' + bikeManu +
        '&per_page=100' +
        '&stolen_before=' + dateBefore +
        '&stolen_after=' + dateAfter).then(function(response) {
    $('#bikes').empty();
    var trekBikes = [];
    var schwinnBikes = [];
    var giantBikes = [];
    var diamondbackBikes = [];
    var konaBikes = [];
    var specializedBikes = [];
    var otherBikes = [];
    response.bikes.forEach(function(bike) {
      // $('#bikes').append('<li>' + bike.manufacturer_name + ", " + bike.frame_colors + '</li>');

      if (bike.manufacturer_name === "Trek") {
        trekBikes.push(bike.manufacturer_name);
      } else if (bike.manufacturer_name === "Schwinn") {
        schwinnBikes.push(bike.manufacturer_name);
      } else if (bike.manufacturer_name === "Giant") {
        giantBikes.push(bike.manufacturer_name);
      } else if (bike.manufacturer_name === "Diamondback") {
        diamondbackBikes.push(bike.manufacturer_name);
      } else if (bike.manufacturer_name === "Diamondback") {
        konaBikes.push(bike.manufacturer_name);
      } else if (bike.manufacturer_name === "Diamondback") {
        specializedBikes.push(bike.manufacturer_name);
      } else {
        otherBikes.push(bike.manufacturer_name);
      }
    });
    $('#bikes').append('<li>' + trekBikes.length + " Treks" + '</li>');
    $('#bikes').append('<li>' + schwinnBikes.length + " Schwinns" + '</li>');
    $('#bikes').append('<li>' + giantBikes.length + " Giants");
    $('#bikes').append('<li>' + diamondbackBikes.length + " Diamondbacks" + '</li>');
    $('#bikes').append('<li>' + konaBikes.length + " Konas" + '</li>');
    $('#bikes').append('<li>' + specializedBikes.length + " Specializeds" + '</li>');
    $('#bikes').append('<li>' + otherBikes.length + " Others"  + '</li>');
    console.log(response.bikes);



  }).fail(function(error) {
    $('.results').text('didnt work');
  });
};


exports.bicycleModule = BicycleChecker;
