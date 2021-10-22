angular.module("meanGam").factory("gameFactory", gameFactory);

function gameFactory($http){
    return {
        oneGame:getOneGame,
        allGame:getAllGame,
        addGame:addGame,
        deleteGame:deleteGame,
        updateGame:updateGame
       
    }

    function getOneGame(id){
        
        return $http.get("/api/games/"+id).then(complete).catch(fail);
    }
    
    function getAllGame()
    {
    return $http.get("/api/games").then(complete).catch(fail);    
    }

    function addGame(game){
        
        return $http.post("/api/games",game).then(complete).catch(fail);
    }

    function deleteGame(id){
        return $http.delete("/api/games/"+id).then(complete).catch(fail);
    }

   function updateGame(id){
       return $http.put("/api/games/"+id).then(complete).catch(fail)
   }

    function complete(response){
        console.log("found game is",response.data);
        return response.data;
    }

    function fail(error){
        console.log(error);
        return error.statusText;
    }

}