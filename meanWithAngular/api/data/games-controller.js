const mongoose=require("mongoose");
const Game=mongoose.model("Game");
require("../data/games-model.js")

module.exports.getAllGames = function(req,res)
{
    Game.find().limit(5).exec(function(err,data){
        const response = {
            status:200,
            data: data
        }
        if(err){
            console.log("the getall wrror")
            response.status = 500;
            response.data = err;
        }
       console.log(data);
        res.status(response.status).json(response.data)
    })
}

module.exports.addNewGames = function(req, resp){
    console.log("==>", req.body);
    Game.create({
        designer : req.body.designer, 
	    year: req.body.year,
	    title: req.body.title,
        price: req.body.price,
        players: req.body.players,
        rate: req.body.rate
    },
    function(err, game){
        if(err){
            console.log("error");
        }
        else{
            console.log(game);
            resp.status(201).json(game);
        }
    }
    )
}

module.exports.getOneGame = function(req,res){
    if(req.params && req.params.gid){
        const id = req.params.gid;
        Game.findById(id).exec(function(err,data){
            const response = {
                status:200,
                data: data
            }
            if(err){
                response.status = 500;
                response.data = err;
                res.status(response.status).json({"message":"not correct type of id "})
                return ;
            }
            else if(!data){
                response.status = 400;
                response.data = "Game not found";
            } 
            res.status(response.status).json(response.data)
        })
    }
    
}

module.exports.deleteGame = function(req,res){
    if(req.params && req.params.gid ){
        const id = req.params.gid;
        Game.findByIdAndRemove(id).exec(function(err,data){
            const response = {
                status:200,
                data: data
            }
            if(err){
                response.status = 500;
                response.data = err;
            }
            else if(!data){
                response.status = 400;
                response.data = "Game not found";
            } 
            res.status(response.status).json(response.data)
            
        })
    }
}

module.exports.updateGame = function(req,res){
    if(req.params && req.params.gid ){
        const id = req.params.gid;
        Game.findById(id).exec(function(err,data){
            const response = {
                status:200,
                data: data
            }
            if(err){
                response.status = 500;
                response.data = err;
            }
            else if(!data){
                response.status = 400;
                response.data = "Game not found";
            } 
            if(data){
                _updateGame(req,res,data)
            } else {
                res.status(response.status).json(response.data)
            }
            
        })
    }
}


function _updateGame(req,res,game){

    game.designer = req.body.designer;
    game.year = req.body.year;
    game.title = req.body.title;
    game.price = req.body.price;
    game.players = req.body.players;
    game.rate = req.body.rate;
    
    game.save(function(err,games){
        const response = {
            status:200,
            data:games
            
        }
        if(err){
            response.status = 500;
            response.data = err;
        }
        else {
            res.status(response.status).json(response.data)
        }
    })
}

