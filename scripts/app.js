'use strict';

/**
 * @ngdoc overview
 * @name weatherNowApp
 * @description
 * # weatherNowApp
 *
 * Main module of the application.
 */

var app=angular.module('weatherNowApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ]);

  //redirections
  app.config(function ($routeProvider){//,$locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/weather', {
        templateUrl: 'views/weather.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
