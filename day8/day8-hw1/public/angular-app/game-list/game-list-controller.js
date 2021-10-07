angular.module("meanGames", ["ngRoute"])
.controller("GamesController", GamesController);

function GamesController(GameDataFactory) {
    const vm= this;
    vm.title= "Mean Games App";
    // $http.get("/api/games").then(function(response) {
    //     vm.games= response.data;
    //     });
    GameDataFactory.getAllGames().then(function(response) {
    vm.games= response;
    });
    }
