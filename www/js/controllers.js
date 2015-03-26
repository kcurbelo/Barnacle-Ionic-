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




