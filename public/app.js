angular.module("admin", ["ngRoute", "landing"])

.controller("mainController", ["$scope", "landService", function ($scope, landService) {
    $scope.login = function () {
        landService.login();
    }
    $scope.logout = function () {
        authService.logout();
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