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
        return $http.get("/auth/login", config)
            .then(function (response) {
                sessionStorage.setItem("username", response.data.user.username);
                sessionStorage.setItem("token", response.data.token);
                tokenService.setToken(response.data.token);
            if(sessionStorage.token){
                $location.path("/home");
            }
                return response.data;
            });
    };
    this.logout = function () {
        tokenService.removeToken();
        localStorage.clear();
        console.log(tokenService.getToken());
        $location.path("/dashboard");
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