function BicycleChecker() {
}

BicycleChecker.prototype.getBicycle = function(bikeZip) {
 $.get('https://bikeindex.org:443/api/v2/bikes_search/stolen?page=1&proximity=' + bikeZip).then(function(response) {

   var bikeMakes = response.bikes;
   bikeMakes.forEach(function(make) {
     $('#manufacturer').append('<li>' + make.manufacturer_name + '</li>');
   });

 }).fail(function(error) {
   $('.results').text('didnt work')
 });
}

exports.bicycleModule = BicycleChecker;
