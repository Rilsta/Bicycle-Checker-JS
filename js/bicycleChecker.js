function BicycleChecker() {
}




BicycleChecker.prototype.getBicycle = function(bikeZip, bikeRadius, bikeColor, bikeManu, dateBefore, dateAfter) {

  var myDate = new Date("July 1, 1978 02:30:00");
  var myEpoch = myDate.getTime()/1000.0;
  document.write(myEpoch);


  /*Bike Count Get Request*/
  $.get('https://bikeindex.org:443/api/v2/bikes_search/count?page=1&proximity=' + bikeZip +
        '&proximity_square=' + bikeRadius +
        '&colors=' + bikeColor +
        '&manufacturer=' + bikeManu  +
        '&stolen_before=' + dateBefore +
        '&stolen_after=' + dateAfter).then(function(response) {
    $('#number-stolen').empty();
    $('#number-stolen').append(response.proximity);
  }).fail(function(error) {
    $('.results').text('didnt work')
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
    var otherBikes = [];
    response.bikes.forEach(function(bike) {
      // $('#bikes').append('<li>' + bike.manufacturer_name + ", " + bike.frame_colors + '</li>');

      if (bike.manufacturer_name === "Trek") {
        trekBikes.push(bike.manufacturer_name);
      } else if (bike.manufacturer_name === "Schwinn") {
        schwinnBikes.push(bike.manufacturer_name);
      } else {
        otherBikes.push(bike.manufacturer_name);
      }
    });
    console.log(trekBikes.length);
    console.log(schwinnBikes.length);
    console.log(otherBikes.length);
    console.log(response.bikes);



  }).fail(function(error) {
    $('.results').text('didnt work')
  });
}


exports.bicycleModule = BicycleChecker;
