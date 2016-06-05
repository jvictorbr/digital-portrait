"use strict";angular.module("flickrapiWebappApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"})}]),angular.module("flickrapiWebappApp").controller("MainCtrl",["$scope","$timeout","flickrService",function(a,b,c){a.API_KEY="4b0b8d24092ea21ca8489dc7974a37cc",a.USER_ID="37807846@N08",a.photoIds=new Array,a.currentPhotoset=null,a.currentPhoto=null,a.photoIdSearchCallback=function(d){var e,f=d.data.photos.pages,g=d.data.photos.page,h=d.data.photos.photo;for(e=0;e<h.length;e++){var i=h[e];a.photoIds.push(i.id)}f>g?c.search(a.API_KEY,a.USER_ID,g+1).then(a.photoIdSearchCallback):b(a.getPhoto,5e3)},a.getRandomPhotoId=function(){var b=a.photoIds.length,c=Math.floor(Math.random()*b);return a.photoIds[c]},a.getPhoto=function(){var b=a.getRandomPhotoId();$("#img01Container").fadeOut(),a.getPhotoset(b),a.getPhotoInfo(b)},a.getOptimalSize=function(a){for(var b=null,c=$(window).width(),d=$(window).height(),e=0;e<a.length;e++){var f=a[e];if(!(f.width<c&&f.height<d))break;b=f}return b},a.loadAndDisplayPhoto=function(c,d,e){$(c).attr("src",e.source),$(c).attr("photoWidth",e.width),$(c).attr("photoHeight",e.height),$(c).load(function(){$(c).width($(c).attr("photoWidth")),$(c).height($(c).attr("photoHeight"));var e=$(window).height()-$(c).attr("photoHeight"),f=e/2;$(d).css("margin-top",f),$(d).fadeIn(),b(a.getPhoto,5e3)})},a.getPhotoInfo=function(b){c.get(a.API_KEY,a.USER_ID,b).then(function(b){var c=b.data.sizes.size;a.currentPhoto=a.getOptimalSize(c),a.loadAndDisplayPhoto("#img01","#img01Container",a.currentPhoto)})},a.getPhotoset=function(b){c.getPhotoset(a.API_KEY,a.USER_ID,b).then(function(b){a.currentPhotoset=b.data.set[0]})},a.getAllPhotoIds=function(){c.search(a.API_KEY,a.USER_ID,1).then(a.photoIdSearchCallback)},a.getAllPhotoIds()}]),angular.module("flickrapiWebappApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("flickrapiWebappApp").service("flickrService",["$http",function(a){var b=function(b,c){this.apiKey=b,this.userId=c,this.baseURL="https://api.flickr.com/services/rest/",this.search=function(d){var e=this.baseURL+"?method=flickr.photos.search&api_key="+b+"&user_id="+c+"&format=json&nojsoncallback=1&per_page=500";return d&&(e+="&page="+d),a({url:e,method:"GET"})},this.getAllPhotoIds=function(){},this.get=function(c){var d=this.baseURL+"?method=flickr.photos.getSizes&api_key="+b+"&photo_id="+c+"&format=json&nojsoncallback=1";return a({url:d,method:"GET"})},this.getPhotoset=function(c){var d=this.baseURL+"?method=flickr.photos.getAllContexts&api_key="+b+"&photo_id="+c+"&format=json&nojsoncallback=1";return a({url:d,method:"GET"})}},c={search:function(a,c,d){var e=new b(a,c);return e.search(d)},get:function(a,c,d){var e=new b(a,c);return e.get(d)},getPhotoset:function(a,c,d){var e=new b(a,c);return e.getPhotoset(d)},getAllPhotoIds:function(a,b){}};return c}]),angular.module("flickrapiWebappApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<div class="row"> <div class="col-lg-12"> <div id="img01Container" ng-show="currentPhoto" class="text-center"> <img id="img01" src="https:\\/\\/farm2.staticflickr.com\\/1469\\/26580451041_f5fb456e3f_b.jpg"> </div> </div> </div>')}]);