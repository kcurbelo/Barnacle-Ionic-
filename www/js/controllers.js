angular.module('starter.controllers', ['ionic'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$ionicPopup) {

// Popup logic ====================
$scope.showPopup = function() {
  $scope.data = {}
 };
 // An alert dialog
 $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Don\'t eat that!',
     template: "popover.html"
   });
   console.log("You have tapped the button")
   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
 };

})




//  Maps controller ============================================================

.controller('MapCtrl', function($scope, $ionicLoading, $compile, $http) {



// for(var i = 0; i < myObject.length; i++) {
//   console.log(myObject[i].name)
// }





    $scope.init = function() {
        var myLatlng = new google.maps.LatLng(34.0218628,-118.4804206);

        var locations = [
          ['Bondi Beach', -33.890542, 151.274856, 4],
          ['Coogee Beach', -33.923036, 151.259052, 5],
          ['Cronulla Beach', -34.028249, 151.157507, 3],
          ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
          ['Maroubra Beach', -33.950198, 151.259302, 1]
          ];


        var mapOptions = {
          center: myLatlng,
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);


        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        // Places a map marker when the page loads
        // var marker = new google.maps.Marker({
        //   position: myLatlng,
        //   map: map,
        //   title: 'Uluru (Ayers Rock)'
        // });

        var infowindow = new google.maps.InfoWindow();


  $http
        .get("https://barnacle-api.herokuapp.com", { cache: true })
          .then(function(response){
            var events = response.data;
            console.log(events[0])

        var marker, i;

        for (i = 0; i < events.length; i++) {  
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(events[i].latitude, events[i].longitude),
            map: map
          });

          google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
              infowindow.setContent(events[i].name);
              infowindow.open(map, marker);
            }
          })(marker, i));
        }

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

        $scope.map = map;

        });

    };




    // google.maps.event.addDomListener(window, 'load', initialize);

    $scope.centerOnMe = function() {
        if(!$scope.map) {
            return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
    };

    $scope.clickTest = function() {
        alert('Example of infowindow with ng-click')
    };





})











// Playlist controller ==========================================================
.controller('PlaylistsCtrl', function($scope, $http) {
  $http
        .get("https://barnacle-api.herokuapp.com", { cache: true })
          .then(function(response){
            $scope.events = response.data;
            // console.log($scope.events[0])
          });
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});












