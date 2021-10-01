const gamesData=require("../data/games-data.json");
module.exports.gameGetAll=function(req,res){
    console.log("GET The Mean Game");
   
   res.status(200).json(gamesData)

    
    };
          
   
    