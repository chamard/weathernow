'use strict';
/**
 * @ngdoc controller
 * @name weatherNowApp.controller:Main
 * @description
 * # MainCtrl
 * Controller of the weatherNowApp
 */

var app = angular.module('weatherNowApp');
app.controller('MainCtrl', function($scope, $rootScope, $location, HttpRequest, Display, Cookies) {

  //save settings in a cookie
  $scope.save = function(settings) {
    if(settings.units==='metric'){
      settings.U='°C';
    }else{
      settings.U='°F';
    }
    //put new settings in a cookie
    Cookies.putSettings(settings);

    //refresh forecast if user save settings
    var location=Cookies.getLocation();
    if(location!==undefined){
      this.weather = HttpRequest.getWeather('q=' + location).then(function(weather) {
        Display.forecast(weather);
      }, function(msg) {
        console.error('MainCtrl/submitForm : ' + msg);
      });
            $location.path('/weather');
    }
  };

  //function to set settings (cookies or default)
  $scope.setSettings = function() {
    var settings = Cookies.getSettings();
    if (settings === undefined) {
      //default settings
      $scope.settings = {
        units   : 'metric',
        U       : '°C',
        language: 'en',
        forecast: '7'
      };
      Cookies.putSettings($scope.settings);
    } else {
      //cookies settings
      $scope.settings = angular.copy(settings);
    }
          //console.log($scope.settings);
  };


  /*
   * function submitForm
   */

  $scope.submitForm = function() {
    this.weather = HttpRequest.getWeather('q=' + this.search).then(function(weather) {
      Display.forecast(weather);
    }, function(msg) {
      console.error('MainCtrl/submitForm : ' + msg);
    });
    //to clear the search form after a submit
    this.search = '';
    //redirect to the weather page view
    $location.path('/weather');
  };

  $scope.locateMe = function() {
    //HTML5 geolocation
    if (navigator.geolocation) {
      //redirect to the weather page view

      navigator.geolocation.getCurrentPosition(function(position) {
        //get the latitude and longitude thanks to the HTML5 geolocation
        var $position = 'lat=' + position.coords.latitude + '&lon=' + position.coords.longitude;
        $rootScope.weather = HttpRequest.getWeather($position).then(function(weather) {
          Display.forecast(weather);
        });
      });
        $location.path('/weather');
    } else {
      console.error('no HTLM5 location on this browser');
    }
  };

  $scope.lastvisit = function() {
    //check if a location cookie exist
    var Location = Cookies.getLocation();
    if (Location !== undefined) {
      //if it exist, the last location searched will appear in the search form
      this.search = Location;
      }
  };
  $scope.setSettings();
  $scope.lastvisit();
});
