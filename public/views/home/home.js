angular.module("home", [])

.controller("homeController", ["$scope", "homeService", function ($scope, homeService) {
    homeService.getUser().then(function (response) {
        alert(response.username + " logged in");
    });
    $scope.logout = function () {
        homeService.logout();
    }
}])

.service("homeService", ["$http", "tokenService", "$location", function ($http, tokenService, $location) {
    this.getUser = function () {
        var config = {
            headers: {
                username: sessionStorage.getItem("username")
            }
        };
        return $http.get("/user/getInfo", config).then(function (response) {
            return response.data;
        });
    };
    this.logout = function () {
        tokenService.removeToken();
        localStorage.clear();
        $location.path("/dashboard");
        alert("Logged Out");
    }
}])