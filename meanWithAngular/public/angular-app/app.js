angular.module("meanGam",['ngRoute']).config(config);


function config($routeProvider){
    $routeProvider.when("/",{
        templateUrl:"/angular-app/allGames/allGames.html",
        controller:"allGameController",
        controllerAs:"vmall"
    }).when("/games/:gameId",{
        templateUrl:"/angular-app/oneGame/oneGame.html",
        controller:"oneGameController", 
        controllerAs:"vm"
    }).otherwise({
        redirectTo:"/"
    })
}