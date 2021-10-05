
const mongoose = require("mongoose")
const _publisher = mongoose.model("Publisher");


module.exports.getAllPublisher = function(req,res){
    _publisher.find().exec(function(err,data){
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
module.exports.getOnePublisher = function(req,res){
    if(req.params && req.params.id){
        const id = req.params.id;
        _publisher.findById(id).exec(function(err,data){
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
                response.data = "publisher not found";
            } 
            res.status(response.status).json(response.data)
        })
    }
    
}
module.exports.createPublisher = function(req, resp){
    //  console.log("out side save");
    _publisher.create({
          name : req.body.name, 
         address:{
             city:req.body.city,
             phone:req.body.phone
         }
      },
      function(err, publis){
          if(err){
           //   console.log("error");
          }
          else{
           //   console.log("su save");
              console.log(publis);
              resp.status(201).json(publis);
          }
      }
      )
  }
  function _updatePublisher(req,res,game){
    
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
  module.exports.fullUpdatePublisher = function(req,res){
    if(req.params && req.params.id ){
        const id = req.params.id;
        _publisher.findById(id).exec(function(err,data){
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
                _updatePublisher(req,res,data)
            } else {
                res.status(response.status).json(response.data)
            }
            
        })
    }
}
module.exports.deletePublisher = function(req,res){
    if(req.params && req.params.id ){
        const id = req.params.id;
        _publisher.findByIdAndRemove(id).exec(function(err,data){
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
                response.data = "publisher not found";
            } 
            res.status(response.status).json(response.data)
            
        })
    }
}


