angular.module('starter.controllers', ['ionic', 'ui.router'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicPopover) {

// Popup logic ====================
  // .fromTemplate() method
  var template = "<ion-popover-view class='popover'><ion-header-bar class='grey-text'> <p class='ion-close' ng-click='popover.hide()'></p><h1 class='title grey-text'>Info</h1> </ion-header-bar> <ion-content><br /><div class='popover-text'> Parking: <img src='img/parkingtrue.png' style='width:25px;height:25px' class='images'> <br /> Lifeguards: <img src='img/lifeguardtrue.png' style='width:25px;height:25px' class='images'> <br /> Restrooms: <img src='img/restroomtrue.png' style='width:25px;height:25px' class='images'> <br /> Surfing: <img src='img/surfingtrue.png' style='width:25px;height:25px' class='images'> <br /> Volleyball courts: <img src='img/volleyballtrue.png' style='width:25px;height:25px' class='images'> <br /> Animals allowed: <img src='img/animalstrue.png' style='width:25px;height:25px' class='images'> <br /> Fishing: <img src='img/fishingtrue.png' style='width:25px;height:25px' class='images'> <br /> Firepits: <img src='img/firepittrue.png' style='width:25px;height:25px' class='images'></div> <hr class='style-grey'/> <div class='popover-text'><p>Want to add to Barnacle or see something that isn't quite right? </p> <button ui-sref='app.SuggestionForm' class='button button-calm' ng-click='popover.hide()'> Suggest a change or add info </button><br />       </ion-content></ion-popover-view>";

  $scope.popover = $ionicPopover.fromTemplate(template, {
    scope: $scope
  });


  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });



  // Function to have a path to a page 
  // $scope.go = function ( path ) {
  // $location.path('/SanDiego.html');
  // };
})

//  Maps controller ============================================================

.controller('MapCtrl', function($scope, $ionicLoading, $compile, $http,  $ionicPopup) {

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
      var address = document.getElementById('address').value;
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          // var marker = new google.maps.Marker({
          //     map: map,
          //     position: results[0].geometry.location
          // });
        } else {

       var alertPopup = $ionicPopup.alert({
         title: 'Oopsie',
         template: "We couldn't find that location."
       });
       alertPopup.then(function(res) {
         console.log('Thank you for not eating my delicious ice cream cone');
       });



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
    // var infowindow = new google.maps.InfoWindow();

    var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';
;




  var infowindow = new google.maps.InfoWindow({
      content: contentString
  });



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
              // Parking icon ==================================== 
              var parking = events[i].parking
              if (events[i].parking == true) {
                var parkingicon = "<img src='img/parkingtrue.png' style='width:25px;height:25px'>"
              }
              else {
                var parkingicon = "<img src='img/parking.png' style='width:25px;height:25px;opacity: 0.4;'>"
              }
              // Lifeguard icon ====================================
              var lifeguard = events[i].lifeguard
              if (events[i].lifeguard == true) {
                var lifeguardicon = "<img src='img/lifeguardtrue.png' style='width:25px;height:25px'>"
              }
              else {
                var lifeguardicon = "<img src='img/lifeguard.png' style='width:25px;height:25px;opacity: 0.4;'>"
              }
              // Restroom icon ====================================
              var restroom = events[i].restroom
              if (events[i].restroom == true) {
                var restroomicon = "<img src='img/restroomtrue.png' style='width:25px;height:25px'>"
              }
              else {
              var restroomicon = "<img src='img/restroom.png' style='width:25px;height:25px;opacity: 0.4;'>"
              }
              // Surfing icon ====================================
              var surfing = events[i].surfing
              if (events[i].surfing == true) {
                var surfingicon = "<img src='img/surfingtrue.png' style='width:25px;height:25px'>"
              }
              else {
              var surfingicon = "<img src='img/surfing.png' style='width:25px;height:25px;opacity: 0.4;'>"
              }
              // Volleyball icon ====================================
              var volleyball = events[i].volleyball
              if (events[i].volleyball == true) {
                var volleyballicon = "<img src='img/volleyballtrue.png' style='width:25px;height:25px'>"
              }
              else {
              var volleyballicon = "<img src='img/volleyball.png' style='width:25px;height:25px;opacity: 0.4;'>"
              }
              // Animals icon ====================================
              var animals = events[i].animals
              if (events[i].dog == true) {
                var animalsicon = "<img src='img/animalstrue.png' style='width:25px;height:25px'>"
              }
              else {
              var animalsicon = "<img src='img/animals.png' style='width:25px;height:25px;opacity: 0.4;'>"
              }
              // Animals icon ====================================
              var animals = events[i].animals
              if (events[i].dog == true) {
                var animalsicon = "<img src='img/animalstrue.png' style='width:25px;height:25px'>"
              }
              else {
              var animalsicon = "<img src='img/animals.png' style='width:25px;height:25px;opacity: 0.4;'>"
              }
              // Fishing icon ====================================
              var fishing = events[i].fishing
              if (events[i].fishing == true) {
                var fishingicon = "<img src='img/fishingtrue.png' style='width:25px;height:25px'>"
              }
              else {
              var fishingicon = "<img src='img/fishing.png' style='width:25px;height:25px;opacity: 0.4;'>"
              }
              // Firepit icon ====================================
              var firepit = events[i].firepit
              if (events[i].firepit == true) {
                var firepiticon = "<img src='img/firepittrue.png' style='width:25px;height:25px'>"
              }
              else {
              var firepiticon = "<img src='img/firepit.png' style='width:25px;height:25px;opacity: 0.4;'>"
              }

              


              infowindow.setContent(
              '<h3>'+ events[i].name + '</h3>' + 
              '<p>' + events[i].address_street + ', '+ events[i].address_city +  ', ' +  events[i].address_state + ' ' + events[i].address_zip +
              '<br />' +
              '<p>' + 'Hours: '+ events[i].hours + '</p>' +
              '<hr />' +
              '<p>' + 'Amenities:' + '</p>' +
              parkingicon + ' ' + lifeguardicon + ' ' + restroomicon + ' ' + surfingicon + ' ' + 
              volleyballicon + ' ' + animalsicon + ' ' + fishingicon + ' ' + firepiticon 
                );
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

.controller('SuggestCtrl', function($scope) {
    $scope.sendFeedback= function() {
      console.log("Hey you clicked the SuggestCtrl")
    }

})



// Playlist controller ==========================================================
.controller('PlaylistsCtrl', function($scope, $http, uriComponentEncodeFilter) {
  $http
  .get("https://barnacle-api.herokuapp.com", { cache: true })
    .then(function(response){
      $scope.events = response.data;
      // console.log($scope.events[0])
      $scope.map_link = function(event){
        var address =   event.address_street + ", " + event.address_city;
        var link =      'maps://maps.apple.com/?q=' + uriComponentEncodeFilter(address);
        return '<a href=' + link + ' class="button button-energized">Take me there</a>'
      };
    //   $scope.map_link = <a class="button" href='maps://maps.apple.com/?q={{ event.address_street + ", " + event.address_city | to_trusted }}' >Open Map of Address</a>
    //   address = event.address_street + ", " + event.address_city
    //   $scope.map_link = 'maps://maps.apple.com/?q=' + uriComponentEncodeFilter($scope.event.location);
    //     $scope.location_url = '<a href=' + $scope.location_url + ' class="button button-balanced button-block">Map it!</a>'
    });
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});












