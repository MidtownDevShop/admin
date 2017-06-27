angular.module("admin.auth", ["$ngStorage"])

.service("tokenService", ["$localStorage", function ($localStorage){
    this.setToken = function(token){
        $localStorage.token = token;
    }
    this.getToken = function(){
        return $localStorage.token;
    }
    this.removeToken = function(){
        delete $localStorage.token;
    }
}])

.service("landService", ["$http", "$location", "tokenService", function($http, $location, tokenService){
    this.login = function(login){
         var config = {headers: login};
        return $http.get("/user/login", config)
        .then(function (response){
            tokenService.setToken(response.data.token);
            return response.data;
        });
    };
    this.logout = function(){
        tokenService.removeToken();
        localStorage.clear();
        console.log(tokenService.getToken());
        $location.path("/home");
    }
    this.isAuthenticated = function(){
        return !!tokenService.getToken();
    }
}])

.config(["$httpProvider", function ($httpProvider){
    $httpProvider.interceptors.push("AuthInterceptor");
}]);