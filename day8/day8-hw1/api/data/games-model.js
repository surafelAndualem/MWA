    const mongoose=require("mongoose");
    const gamesSchema=new  mongoose.Schema({
        designer:[String],
        year:Number,
        title:String,
        price: Number,
        players: Number,
        rate: Number
    })

    mongoose.model("Game",gamesSchema,"games");