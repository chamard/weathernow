'use strict';

/*
* @ngdoc service
* @name Cookies
* @description
 * Service to put an get cookies
 */
 
 var app = angular.module('weatherNowApp');
app.service('Cookies', function($cookieStore) {
  //settings cookies
  this.putSettings = function($data) {
    $cookieStore.put('settings', $data);
  };
  this.getSettings = function() {
    return $cookieStore.get('settings');
  };

  //location cookies
  this.putLocation = function($data) {
    $cookieStore.put('location', $data);
  };
  this.getLocation = function() {
    return $cookieStore.get('location');
  };
});
