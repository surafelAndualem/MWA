angular.module("meanGam").controller("allGameController", allGameController);


function allGameController(gameFactory,$route,$location){
    const vm=this
    gameFactory.allGame().then(function(response){    
        vm.games= response;
    
        vm.title= "Mean Games App";
    })
    .catch(function(error){
        console.log(error);
    });

    
}