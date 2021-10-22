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

// module.exports.getAuthorsForBook = function(req,res){
//     if(req.params && req.params.bid){
//         const id = req.params.bid; 
//         Book.findById(id).exec(function(err,data){
//         if(err){
//             res.status(500).json({"message":"this is not correct author ID "})
//             return;
//         }
//             res.status(200).json(data.author)
//         })
//     }
// }


// module.exports.getAuthorById = function(req,res){
//     if(req.params && req.params.aid){
//         const aid = req.params.aid;
//         const bid = req.params.bid;
//         console.log("input Id",bid);
//         Book.findById(bid).exec(function(err,data){
//           if(err){

//             res.status(404).json({"message":"not found id"})
//             return;
//           }
//             console.log("data ",data);
//             let authors = data.author;
            
//             console.log("books ..", authors);
          
//             let author = authors.filter(elem =>elem._id == aid);
//             if(author.length==0){
//                 res.status(404).json({"message":"file not found"});
//                 return;
//             }
//             console.log("found  book ", author);
//             res.json(author)
            
//         })
//     }
    
// }

// module.exports.deleteAuthor = function(req,res){
//     if(req.params && req.params.aid && req.params.bid){
//         const aid = req.params.aid;
//         const bid = req.params.bid;
//         console.log("input Id",bid);

//         Book.findById(bid).exec(function(err,updatedBook){
//             let authors = updatedBook.author;
//             console.log("authors ..", authors);
           
//             let updatedAuthors = authors.filter(elem =>elem._id != aid);
//             updatedBook.author=updatedAuthors
//             updatedBook.save(function(err,newBook){
//                 const response = {
//                     status:200,
//                     data: newBook
//                 }
//                 if(err){
//                     response.status = 500;
//                     response.data = err;
//                     return;
//                 }
//                 else {
//                     res.status(response.status).json(response.data)
//                 }
//             })

//         })
//     }
    
// }

// module.exports.addAuthor = function(req,res){
//     if(req.params && req.params.bid){
       
//         const bid = req.params.bid;
//         console.log("input Id",bid);
//         let auth={};
//         auth.name=req.body.name;
//         auth.age=parseInt(req.body.age);
//         console.log("authors ..", auth);
//         Book.findById(bid).exec(function(err,updatedBook){
//             console.log("found book ..", updatedBook);
//             let authors = updatedBook.author;
//             console.log("authours of found book ..", authors);
//            authors.push(auth);
//            updatedBook.author=authors;
//            console.log("saved new book authors", updatedBook.author);
//            updatedBook.save(function(err,newBook){
//                console.log("saved new book", newBook);
//                 const response = {
//                     status:200,
//                     data: newBook
//                 }
//                 if(err){
//                     response.status = 500;
//                     response.data = err;
//                     return;

//                 }
//                 else {
//                     res.status(response.status).json(response.data);
//                 }
//             })

//         })
//     }
    
// }

// module.exports.updatAuthor = function(req,res){
//     if(req.params && req.params.bid && req.params.aid){
//         let bid=req.params.bid;
//         let authorId=req.params.aid;
//         Book.findById(bid).exec(function(err,updatedBook){
//             if(err){
//                 res.status(404).json({"message":err});
//             }
//             console.log("updated author",updatedBook);
//             let authors = updatedBook.author;
// console.log(" only autohr",authors);
//         let updatAuthor= authors.filter(elem=>elem._id==authorId)[0];
// console.log("filterde authors",updatAuthor);
//           updatAuthor.name=req.body.name;
//           updatAuthor.age=req.body.age;
//           console.log("afer new  update are added",updatAuthor);
//           updatedBook.save(function(err,newBook){
//             console.log("saved new book", newBook);
//              const response = {
//                  status:200,
//                  data: newBook
//              }
//              if(err){
//                  response.status = 500;
//                  response.data = err;
//                  return;
//              }
//              else {
//                  res.status(response.status).json(response.data);
//              }
//          })
//         })


//     }}


// module.exports.gamesGetAll=function(req,res){
//     var offset=0;
//     var count=5;
//     const maxCount=10;
//     if(req.query && req.query.offset){
//         offset=parseInt(req.query.offset,10);
//     }
//     if (req.query && req.query.count) {
//         offset= parseInt(req.query.count, 10);
//         }

//         if(isNaN(offset) || isNaN(count)){
//             res.status(400).json({"message":"QueryString Offset and count should be number"})
//             return;
//         }
//         if(count>maxCount){
//             res.status(400).json({"message":"can not exceed count of  "+ maxCount});
//             return;
//         }
       
//         Game.find().limit(5).exec(function(err,games){
//             if(err){
//                         console.log("error finding games");
//                         res.status(500).json(err);
//                     }else{
//             console.log("game found",games);
//             res.json(games)}
//         });
// }

// module.exports.gamesGetOne=function(req,res){
// const gameid=req.params.gameid;
// Game.findById(gameid).exec(function(err,game){
//     if(gameid.length!=24){
//         res.status(500).json({"message":"the length of id is not correct"})
//         console.log("enter the correct id");
//         return 
//     }
//     if(err){
       
// console.log("error finding games");
// res.status(500).json(err)
// return
//     }else if(!game) {
//         res.status(404).json({"message" : "Game ID not found"})
//     }
//     else{
//     res.status(200).json(game)
//     console.log("game found",game)
  
// }

// })

// }

