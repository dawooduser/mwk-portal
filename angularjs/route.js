var app = angular.module("app", ["ngRoute", "ngStorage"]);
// app.value('url', 'http://localhost:5000');
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "../pages/services.html",
        controller: 'mainCtrl'
    })
    .when("/project", {
      templateUrl : "../pages/project.html",
      controller: 'project'
  })
    .otherwise({
      redirectTo: "/"
    })
  
  
  
    // .when("/red", {
    //     templateUrl : "red.htm"
    // })
    // .when("/green", {
    //     templateUrl : "green.htm"
    // })
    // .when("/blue", {
    //     templateUrl : "blue.htm"
    // });
    $locationProvider.html5Mode(true);
});
app.directive('onErrorSrc', function() {
    return {
        link: function(scope, element, attrs) {
          element.bind('error', function() {
            if (attrs.src != attrs.onErrorSrc) {
              attrs.$set('src', attrs.onErrorSrc);
            }
          });
        }
    }
});