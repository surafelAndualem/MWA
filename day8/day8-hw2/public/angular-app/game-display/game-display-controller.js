angular.module("mean_Games").controller("GameController",GameController);
function GameController(GameDataFactory, $routeParams) {
const vm= this;
const id= $routeParams.id;
GameDataFactory.getOneGame(id).then(function(response) {
vm.game= response;
});
}