var app = angular.module("myApp", ["ngRoute","ngStorage","ngImgCrop"]);
app.constant('url', 'http://localhost:5000');
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "./angular/pages/login.html",
        controller: 'Loginctrl',
    })
    .when("/portal", {
        templateUrl : "./angular/pages/portal.html",
        controller: 'portal',
    })
});