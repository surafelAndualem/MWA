const mongoose = require("mongoose")
const _game = mongoose.model("Games");
// const Course = mongoose.model("Course");
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



module.exports.getCoursesForStudent = function(req,res){
    if(req.params && req.params.id){
        const id = req.params.id; //students id
        Student.findById(id).exec(function(err,data){

            res.status(200).json(data.courses)
        })
    }
}

module.exports.getCourseByIdInStudent = function(req,res){
    if(req.params && req.params.id){
        const id = req.params.id;
        const gid = req.params.cid;
        console.log("input Id",gid);
        Student.findById(id).exec(function(err,data){
            let games = data.courses;
            console.log("games ..", games);
            games.map(d=>console.log("==>",d._id));
            let game = games.filter(el =>el._id == gid);
            console.log("found  games ", game);
            res.json(game)
            
        })
    }
    
}

module.exports.addCourseToStudent = function(req,res){
    if(req.params && req.params.id){
        Course.findOne().exec(function(err,data){
            Student.findByIdAndUpdate(req.params.id,{$set:{courses:[data]}}).exec(function(err,student){
                res.status(200).json(student)
            })
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

