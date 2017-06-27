angular.module("landing", ['ngStorage'])

.service("tokenService", ["$localStorage", function ($localStorage) {
    this.setToken = function (token) {
        $localStorage.token = token;
    }
    this.getToken = function () {
        return $localStorage.token;
    }
    this.removeToken = function () {
        delete $localStorage.token;
    }
}])

.service("landService", ["$http", "$location", "tokenService", function ($http, $location, tokenService) {
    this.login = function (login) {
        var config = {
            headers: login
        };
        return $http.get("/user/login", config)
            .then(function (response) {
                tokenService.setToken(response.data.token);
                return response.data;
            });
    };
    this.logout = function () {
        tokenService.removeToken();
        localStorage.clear();
        console.log(tokenService.getToken());
        $location.path("/home");
    }
    this.isAuthenticated = function () {
        return !!tokenService.getToken();
    }
}])

.service("AuthInterceptor", ["$q", "$location", "tokenService", function ($q, $location, tokenService) {
    this.request = function (config) {
        var token = tokenService.getToken();
        if (token) {
            config.headers = config.headers;
            config.headers.Authorization = "Bearer " + token;
        }
        return config;
    }
    this.responseError = function (response) {
        if (response.status == 401) {
            tokenService.removeToken();
            $location.path("/dashboard")
        }
    }
}])


.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.interceptors.push("AuthInterceptor");
}]);