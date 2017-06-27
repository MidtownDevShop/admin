angular.module("admin", ["ngRoute", "admin.auth"])

.controller("mainController", ["$scope", "landService", function ($scope, landService) {
    $scope.login = function(){
        landService.login();
    }
}])

.config(function ($routeProvider) {
    $routeProvider.when("/home", {
            templateUrl: "./views/home/home.html",
            controller: "homeController"
        })
        .when("/dashboard", {
            templateUrl: "./views/landing/landing.html",
            controller: "mainController"
        })
        .otherwise("/dashboard", {
            redirectTo: "/dash"
        });
});