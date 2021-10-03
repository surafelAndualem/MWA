    const mongoose=require("mongoose");
    const gamesSchema=new  mongoose.Schema({
        title:String,
        price: Number,
        designer:[String],
        players: Number,
        rate: Number
    })

    mongoose.model("Game",gamesSchema,"games");