const mongoose=require("mongoose");

const publisherSchema=new mongoose.Schema({ 
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        city:String,
        phone:Number
    
    }
});


const gameSchema=new mongoose.Schema({
    title: {
        type: String,
        required: true
        },
        year:Number,
  price : Number,
    
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
        },
        publisher: [publisherSchema]
  
});

mongoose.model("Games",gameSchema,"games");