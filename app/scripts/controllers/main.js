'use strict';

/**
 * @ngdoc function
 * @name flickrapiWebappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flickrapiWebappApp
 */
angular.module('flickrapiWebappApp').controller('MainCtrl', function ($scope, $timeout, flickrService) {

  $scope.API_KEY = "4b0b8d24092ea21ca8489dc7974a37cc";
  $scope.USER_ID = "37807846@N08";
  $scope.photoIds = new Array();
  $scope.currentPhotoset = null;
  $scope.currentPhoto = null;

  // loads all photo ids for the given user
  // then starts a timer that will randomly fetch and display a photo
  $scope.photoIdSearchCallback = function(response) {
    var pages = response.data.photos.pages;
    var page = response.data.photos.page;
    var photos = response.data.photos.photo;
    var i;
    for (i = 0; i < photos.length; i++) {
      var photo = photos[i];
      $scope.photoIds.push(photo.id);
    }
    if (page < pages) {
      // there's still more photos to load
      flickrService.search($scope.API_KEY, $scope.USER_ID, page+1).then($scope.photoIdSearchCallback);
    } else {
      // all photo ids retrieved. will start timer to retrieve random photos
      $timeout($scope.getPhoto, 5000);
    }
  }

  $scope.getRandomPhotoId = function() {
    var photosCount = $scope.photoIds.length;
    var randomIndex = Math.floor(Math.random()*photosCount);
    return $scope.photoIds[randomIndex];
  }

  $scope.getPhoto = function() {
    var randomPhotoId = $scope.getRandomPhotoId();
    $("#img01Container").fadeOut();
    $scope.getPhotoset(randomPhotoId); // Retrieve the photoset which the photo belongs to
    $scope.getPhotoInfo(randomPhotoId);
  }

  $scope.getOptimalSize = function(photosArray) {
    var currentPhoto = null;

    var windowWidth = $(window).width();
    var windowHeight = $(window).height();

    for (var i = 0; i < photosArray.length; i++) {
      var photo = photosArray[i];
      if (!(photo.width < windowWidth && photo.height < windowHeight)) {
        break;
      } else {
        currentPhoto = photo;
      }
    }
    return currentPhoto;
  }

  $scope.loadAndDisplayPhoto = function(photoElementId, photoContainerElementId, photo) {
    $(photoElementId).attr("src", photo.source);
    $(photoElementId).attr("photoWidth", photo.width);
    $(photoElementId).attr("photoHeight", photo.height);
    $(photoElementId).load(function(){
      $(photoElementId).width($(photoElementId).attr("photoWidth"));
      $(photoElementId).height($(photoElementId).attr("photoHeight"));
      var offset = $(window).height() - $(photoElementId).attr("photoHeight");
      var margin = offset/2;
      $(photoContainerElementId).css("margin-top", margin);
      $(photoContainerElementId).fadeIn();
      $timeout($scope.getPhoto, 5000);
    });
  }

  $scope.getPhotoInfo = function(randomPhotoId) {
    flickrService.get($scope.API_KEY, $scope.USER_ID, randomPhotoId).then(function(response) {
      var photosArray = response.data.sizes.size;
      $scope.currentPhoto = $scope.getOptimalSize(photosArray);
      $scope.loadAndDisplayPhoto("#img01", "#img01Container", $scope.currentPhoto);
    });
  }

  $scope.getPhotoset = function(photoId) {
    flickrService.getPhotoset($scope.API_KEY, $scope.USER_ID, photoId).then(function(response) {
      $scope.currentPhotoset = response.data.set[0];
    });
  }

  $scope.getAllPhotoIds = function() {
    flickrService.search($scope.API_KEY, $scope.USER_ID, 1).then($scope.photoIdSearchCallback);
  }

  $scope.getAllPhotoIds();

});
