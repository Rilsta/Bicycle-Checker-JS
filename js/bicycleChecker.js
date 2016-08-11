function BicycleChecker() {
}

BicycleChecker.prototype.getBicycle = function(bikeZip, bikeRadius, bikeColor, bikeManu) {

  /*Bike Count Get Request*/
  $.get('https://bikeindex.org:443/api/v2/bikes_search/count?page=1&proximity=' + bikeZip + '&proximity_square=' + bikeRadius + '&colors=' + bikeColor + '&manufacturer=' + bikeManu).then(function(response) {
    $('#number-stolen').empty();
    $('#number-stolen').append(response.proximity);
  }).fail(function(error) {
    $('.results').text('didnt work')
  });
}

  /*Bike Info Get Request*/
 $.get('https://bikeindex.org:443/api/v2/bikes_search/stolen?page=1&proximity=' + bikeZip + '&proximity_square=' + bikeRadius + '&colors=' + bikeColor + '&manufacturer=' + bikeManu).then(function(response) {
   $('#bikes').empty();
   var bikeMakes = response.bikes;
   bikeMakes.forEach(function(bike) {
    $('#bikes').append('<li>' + bike.manufacturer_name + ", " + bike.frame_colors + '</li>');
   });
 }).fail(function(error) {
   $('.results').text('didnt work')
 });


exports.bicycleModule = BicycleChecker;
