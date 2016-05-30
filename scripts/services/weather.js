'use strict';

/**
 * @ngdoc service
 * @name weatherNowApp.controller:weather
 * @description
 * # weather
 * Factory to ask weather to openweathermap
 */
 
var app = angular.module('weatherNowApp');
var $key = '???YOUR OPENWEATHERMAP KEY???';
var $daily = 'http://api.openweathermap.org/data/2.5/forecast/daily?';

app.factory('HttpRequest', function($http, $q, Cookies) {
  var factory = {
    weather: false,
    getWeather: function($city) {
      var settings = Cookies.getSettings();
      var defered = $q.defer();
      //http request with user settings
      $http.get($daily+ $city +
          '&units=' + settings.units +
          '&cnt=' + settings.forecast +
          '&lang=' + settings.language +
          '&appid=' + $key)
        .success(function(data) {
          factory.weather = data;
          defered.resolve(data);
        }).error(function(status) {
          defered.reject('connexion error' + status);
        });
      return defered.promise;
    }
  };
  return factory;
});
