const mongoose=require("mongoose");


const gameSchema=new mongoose.Schema({
    title: {
        type: String,
        required: true
        },
        year:Number,
  price : Number,
     //  designers : [String],
        players : {
        type: Number,
        min : 1,
        max: 10
        },
        rate: {
        type: Number,
        min: 1,
        max: 5,
        "default": 1
        }
  
});

mongoose.model("Games",gameSchema,"games");