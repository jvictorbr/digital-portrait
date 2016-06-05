'use strict';

/**
 * @ngdoc service
 * @name flickrapiWebappApp.flickrService
 * @description
 * # flickrService
 * Service in the flickrapiWebappApp.
 */
angular.module('flickrapiWebappApp').service('flickrService', function ($http) {

  var Flickr = function(apiKey, userId) {
    this.apiKey = apiKey;
    this.userId = userId;
    this.baseURL = "https://api.flickr.com/services/rest/";
    this.search = function(page) {
      var url = this.baseURL + "?method=flickr.photos.search&api_key="+apiKey+"&user_id="+userId+"&format=json&nojsoncallback=1&per_page=500";
      if (page) {
        url += "&page="+page;
      }
      return $http({url: url, method: 'GET'});
    }
    this.getAllPhotoIds = function() {

    }
    this.get = function(photoId) {
      var url = this.baseURL + "?method=flickr.photos.getSizes&api_key="+apiKey+"&photo_id="+photoId+"&format=json&nojsoncallback=1"
      return $http({url: url, method: 'GET'});
    }
    this.getPhotoset = function(photoId) {
      var url = this.baseURL +"?method=flickr.photos.getAllContexts&api_key="+apiKey+"&photo_id="+photoId+"&format=json&nojsoncallback=1";
      return $http({url: url, method: 'GET'});
    }
  }

  var service = {
    search: function(apiKey, userId, page) {
      var flickr = new Flickr(apiKey, userId);
      return flickr.search(page);
    },
    get: function(apiKey, userId, photoId) {
      var flickr = new Flickr(apiKey, userId);
      return flickr.get(photoId);
    },
    getPhotoset: function(apiKey, userId, photoId) {
      var flickr = new Flickr(apiKey, userId);
      return flickr.getPhotoset(photoId);
    },
    getAllPhotoIds: function(apiKey, userId) {

    }
  }

  return service;

  });
