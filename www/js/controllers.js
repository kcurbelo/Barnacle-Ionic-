angular.module('starter.controllers', [])

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

// .controller("MapController", function($scope){


  // google.maps.event.addDomListener(window, "load", function(){

  //   var myLatlng = new google.maps.LatLng(37.3000, -120.4833);

  //   var mapOptions = {
  //       center: myLatlng, 
  //       zoom: 16, 
  //       myTypeId: google.maps.MapTypeId.ROADMAP
  //   };

  //   var map = new google.maps.Map(document.getElementById("map"), mapOptions);

  //   $scope.map = map;

  // })


// console.log("sads")

// var map;
// function initialize() {
//   var mapOptions = {
//     zoom: 8,
//     center: new google.maps.LatLng(-34.397, 150.644)
//   };
//   map = new google.maps.Map(document.getElementById('map-canvas'),
//       mapOptions);
// }

// google.maps.event.addDomListener(window, 'load', initialize);




// Playlist controller ==========================================================
.controller('PlaylistsCtrl', function($scope, $http) {
  $http
        .get("https://barnacle-api.herokuapp.com", { cache: true })
          .then(function(response){
            $scope.events = response.data;
          });
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});







