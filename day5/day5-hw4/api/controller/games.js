const mongoose = require("mongoose")
const _game = mongoose.model("allGames");

module.exports.getAllGames = function(req,res){
    _game.find().exec(function(err,data){
        const response = {
            status:200,
            data: data
        }
        if(err){
            response.status = 500;
            response.data = err;
        }
       console.log(data);
        res.status(response.status).json(response.data)
    })
}

module.exports.getOneGame = function(req,res){
    if(req.params && req.params.id){
        const id = req.params.id;
        _game.findById(id).exec(function(err,data){
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
                response.data = "game not found";
            } 
            res.status(response.status).json(response.data)
        })
    }
    
}


function _updateGame(req,res,game){
    
    game.title = req.body.title;
    game.year = req.body.year;
   
    game.price = req.body.price;
    
    game.save(function(err,games){
        const response = {
            status:200,
            data: games
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

module.exports.fullUpdateGame = function(req,res){
    if(req.params && req.params.id ){
        const id = req.params.id;
        _game.findById(id).exec(function(err,data){
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
                response.data = "game not found";
            } 
            if(data){
                _updateGame(req,res,data)
            } else {
                res.status(response.status).json(response.data)
            }
            
        })
    }
}

module.exports.deleteGame = function(req,res){
    if(req.params && req.params.id ){
        const id = req.params.id;
        _game.findByIdAndRemove(id).exec(function(err,data){
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

module.exports.creatGame = function(req, resp){
  //  console.log("out side save");
    _game.create({
        title : req.body.title, 
        year: req.body.year,
	    price: req.body.price,
	   players:req.body.players,
        rate:req.body.rate,
       // publisher:req.body.publisher
    },
    function(err, gamee){
        if(err){
         //   console.log("error");
        }
        else{
         //   console.log("su save");
            console.log(gamee);
            resp.status(201).json(gamee);
        }
    }
    )
}

