function BicycleChecker() {
}

BicycleChecker.prototype.getBicycle = function(bikeZip, bikeRadius, bikeColor) {
 $.get('https://bikeindex.org:443/api/v2/bikes_search/stolen?page=1&proximity=' + bikeZip + '&proximity_square=' + bikeRadius + '&colors=' + bikeColor).then(function(response) {
   var bikeMakes = response.bikes;
   bikeMakes.forEach(function(bike) {
    $('#bikes').append('<li>' + bike.manufacturer_name + ", " + bike.frame_colors + '</li>');
   });
   console.log(bikeMakes);
 }).fail(function(error) {
   $('.results').text('didnt work')
 });
}

exports.bicycleModule = BicycleChecker;
