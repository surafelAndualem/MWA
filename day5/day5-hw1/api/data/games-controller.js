const mongoose=require("mongoose");
const Game=mongoose.model("Game");
require("../data/games-model.js")
module.exports.gamesGetAll=function(req,res){
    var offset=0;
    var count=5;
    const maxCount=10;
    if(req.query && req.query.offset){
        offset=parseInt(req.query.offset,10);
    }
    if (req.query && req.query.count) {
        offset= parseInt(req.query.count, 10);
        }

        if(isNaN(offset) || isNaN(count)){
            res.status(400).json({"message":"QueryString Offset and count should be number"})
            return;
        }
        if(count>maxCount){
            res.status(400).json({"message":"can not exceed count of  "+ maxCount});
            return;
        }
       
        Game.find().exec(function(err,games){
            if(err){
                        console.log("error finding games");
                        res.status(500).json(err);
                    }else{
            console.log("game found",games);
            res.json(games)}
        });
}

module.exports.gamesGetOne=function(req,res){
const gameid=req.params.gameid;
Game.findById(gameid).exec(function(err,game){
    if(err){
console.log("error finding games");
res.status(500).json(err)
    }else if(!game) {
        res.status(404).json({"message" : "Game ID not found"})
    }
    else{
    res.status(200).json(game)
}
const response= {
    status: 200,
    message: game};
    if (err) {
    console.log("Error finding game");
    response.status= 500;
    response.message= err;
    } else if(!game) {
    response.status= 404;
    response.message= {"message" : "Game ID not found"};
    }
    res.status(response.status).json(response.message);
})
}