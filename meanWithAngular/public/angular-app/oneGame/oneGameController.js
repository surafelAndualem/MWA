angular.module("meanGam").controller("oneGameController", oneGameController);

function oneGameController(gameFactory,$routeParams,$location,$route){
    const vm= this;
    const id = $routeParams.gameId;
    gameFactory.oneGame(id).then(function(response){
        vm.game = response;
        console.log("found game is in controller",response.data);

    })
    .catch(function(error){
        console.log(error);
    });
vm.addGame=function(){
    const addGame = {
        publisher: vm.gpublisher,
        year: vm.gyear,
        title: vm.gtitle,
        price: vm.gprice,
        players:vm.gplayers,
        rate:vm.grate
    }
    gameFactory.addGame(addGame).then(function(response){
        $route.reload();
    })
}

    vm.deleteGame = function(id){
        gameFactory.deleteGame(id).then(function(response){
            
            console.log(response);
            $location.path('/');
        }).catch(function(){
            console.log("error");
        });
    }
    
    vm.updateGame = function(){
        
        const updateGame = {
            publisher: vm.gpublisher,
            year: vm.gyear,
            title: vm.gtitle,
            price: vm.gprice,
            players:vm.gplayers,
            rate:vm.grate
        }

        console.log("here==>",updateGame);
        gameFactory.updateGame(id,updateGame).then(function(response){
            
            console.log(response);
            $route.reload();
        }).catch(function(){
            console.log("error");
        });
    }
}   ``