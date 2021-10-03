
const mongoose = require("mongoose")
const _game = mongoose.model("Games");
const _addPublisher= function(req, res, game) {
    game.publisher.name= req.body.name;
    game.publisher.location.coordinates= [parseFloat(req.body.lng), parseFloat(req.body.lat)];
    game.save(function(err, updatedGame) {
    const response= {status: 200, message: []};
    if (err) {
    response.status= 500;
    response.message= err;
    } else {
    response.status= 201;
    response.message= updatedGame.publisher;
    }
    res.status(response.status).json(response.message);
    });
    }

module.exports.publisherGet=function(req,res){
    const gameid=req.params.id;
    const publisher=req.params.publisher
    console.log("get game id " +gameid);
    _game.findById(gameid).select(publisher).exec(function(err,game){
        const response= {status: 200, message: []};
        if (err) {
            console.log("Error finding game");
            response.status= 500; response.message= err;
            } else if (!game) {
            console.log("Game id not found in database", id);
            response.status= 404; response.message= {"message": "Game ID not found"+gameid};
            } else {
            response.message= game.publisher? game.publisher : [];
            }
            res.status(response.status).json(response.message);
    })    
}

module.exports.publisherAdd= function(req, res) {

    const gameId= req.params.id;
    const publisher=req.params.publisher
    console.log("Get gameId ", gameId);
    _game.findById(gameId).select(publisher).exec(function(err, game) {
    const response= {status: 200, message: []};
    if (err) {
    console.log("Error finding game");
    response.status= 500; response.message= err;
    } else if (!game) {
    console.log("Game id not found in database", id);
    response.status= 404; response.message= {"message": "Game ID not found"+gameId};
    }
    if (game) {
    _addPublisher(req, res, game);
    } else {
    res.status(response.status).json(response.message);
    }
    })
};