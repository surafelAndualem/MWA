const mongoose = require("mongoose")
const _game = mongoose.model("Games");

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
function _updateGame(req,res,gamee){
    
    gamee.title = req.body.title;
    gamee.year = req.body.year;
   
    gamee.price = req.body.price;
    gamee.players=req.body.players;
    gamee.rate=req.body.rate;
   // console.log("outside save");
    gamee.save(function(err,gamess){
    
        const response = {
            status:200,
            data: gamess
            
        }
        if(err){
       //     console.log("inside error");
            response.status = 500;
            response.data = err;
            console.log(response.data)
        }
        
       else
         {       
          //   console.log("on save");
           //  console.log(gamee)
            res.status(response.status).json(response.data)
        }
    })
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
    console.log("==>", req.body);
    _game.create({
        title : req.body.title, 
	    price: req.body.price,
	    year: req.body.year
    },
    function(err, gamee){
        if(err){
            console.log("error");
        }
        else{
            console.log(gamee);
            resp.status(201).json(gamee);
        }
    }
    )
}

