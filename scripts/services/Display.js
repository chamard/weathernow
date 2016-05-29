'use strict';
/**
 * @ngdoc function
 * @name weatherNowApp.controller:Display
 * @description
 * # Display
 * Service to screen the weather and save settings in a cookie
 */
var app = angular.module('weatherNowApp');
app.service('Display', function($rootScope, Cookies) {
  this.forecast = function(weather) {
    $rootScope.weather = weather;
    //send units (°C or °F) to the rootscope
    $rootScope.U = Cookies.getSettings().U;
    Cookies.putLocation(weather.city.name);
  };
});
