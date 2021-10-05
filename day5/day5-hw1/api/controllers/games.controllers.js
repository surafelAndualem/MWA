
const dbConnection = require("../data/dbconnection.js")

module.exports.allgames = function(req, res){
    const db = dbConnection.get();
    console.log("db", db);
   
    const connection = db.collection("games");
    if(req.query && parseInt(req.query.limit) <= 9 ){
        var offset = parseInt(req.query.limit)
        connection.find().limit(offset).toArray(function(err, game){ res.status(200).json(game)})
    } else {
        connection.find().limit(6).toArray(function(err, _game){
            if(err) {
                res.status(400).send("there is no game")
            }
            else res.status(200).json(_game);
        })
    }
}
    