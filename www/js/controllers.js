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

  var geocoder;
  var map;

  // Hybrid button ================================================================
  function CenterControl(controlDiv, map) {

    // Set CSS for the control border
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = 'rgba(248, 253, 254, 0.5)';
    // controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    // controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginTop = '15px';
    controlUI.style.marginRight = '10px';    
    controlUI.style.marginLeft = '10px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to recenter the map';
    controlDiv.appendChild(controlUI);
    // Set CSS for the control interior
    var controlText = document.createElement('div');
    controlText.style.color = 'rgba(0, 0, 0, 0.5)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Satellite';
    controlUI.appendChild(controlText);
    // mapTypeId: google.maps.MapTypeId.SATELLITE      
    google.maps.event.addDomListener(controlUI, 'click', function() {
      map.setMapTypeId(google.maps.MapTypeId.HYBRID);
      console.log("Switched to hybrid")
    });
  };

   // Roadmap button ================================================================
   function CenterControl2(controlDiv2, map) {
    // Set CSS for the control border
    var controlUI2 = document.createElement('div');
    controlUI2.style.backgroundColor = 'rgba(248, 253, 254, 0.5)';
    // controlUI2.style.border = '2px solid #fff';
    controlUI2.style.borderRadius = '3px';
    // controlUI2.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI2.style.cursor = 'pointer';
    controlUI2.style.marginTop = '15px';
    controlUI2.style.textAlign = 'center';
    controlUI2.title = 'Click to recenter the map';
    controlDiv2.appendChild(controlUI2);
    // Set CSS for the control interior
    var controlText2 = document.createElement('div');
    controlText2.style.color = 'rgba(0, 0, 0, 0.5)';
    controlText2.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText2.style.fontSize = '16px';
    controlText2.style.lineHeight = '38px';
    controlText2.style.paddingLeft = '5px';
    controlText2.style.paddingRight = '5px';
    controlText2.innerHTML = 'Map';
    controlUI2.appendChild(controlText2);
    // mapTypeId: google.maps.MapTypeId.SATELLITE      
    google.maps.event.addDomListener(controlUI2, 'click', function() {
      map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
      console.log("Switched to hybrid")
    });
  }


  $scope.init = function() {
      geocoder = new google.maps.Geocoder();
      var myLatlng = new google.maps.LatLng(34.0218628,-118.4804206);
      var mapOptions = {
        center: myLatlng,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
        };

      var map = new google.maps.Map(document.getElementById("map"),
          mapOptions);


      // Creates hybrid button =========================================================
      var centerControlDiv = document.createElement('div');
      var centerControl = new CenterControl(centerControlDiv, map);
      centerControlDiv.index = 1;
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);

      // Creates roadmap button =========================================================
      var centerControl2Div = document.createElement('div');
      var centerControl2 = new CenterControl2(centerControl2Div, map);
      centerControl2Div.index = 1;
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControl2Div);


      // Geocoder ==============================================================
      $scope.codeAddress= function() {
        console.log("asdasd")
        var address = document.getElementById('address').value;
        geocoder.geocode( { 'address': address}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            // var marker = new google.maps.Marker({
            //     map: map,
            //     position: results[0].geometry.location
            // });
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }

        // Marker + infowindow + angularjs compiled ng-click ==============================================
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

        // Get the data for lat, lng ==============================================================
        $http
        .get("https://barnacle-api.herokuapp.com", { cache: true })
          .then(function(response){

            var events = response.data;
            console.log(events[0])
            var marker, i;

            for (i = 0; i < events.length; i++) {  
              marker = new google.maps.Marker({
                position: new google.maps.LatLng(events[i].latitude, events[i].longitude),
                map: map, 
                icon: 'img/marker.png'
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

    // Centering in on the user location ========================================================
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
      }, 
      function(error) {
        alert('Unable to get location: ' + error.message);
      });

    };

    $scope.clickTest = function() {
        alert('Example of infowindow with ng-click')
    };

// End of controller
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












