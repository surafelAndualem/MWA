const mongoose=require("mongoose");
const publisherModel=require("./publisher-model")

//  const publisherSchema=new mongoose.Schema({ 
//     name:{
//         type:String,
//         required:true
//     },
//     address:{
//        // type:String,
//         city:String,
//         phone:Number
    
//     }
// });
// mongoose.model("Publisher",publisherSchema,"publisher")

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
        publisher1: [publisherModel]
  
});

mongoose.model("allGames",gameSchema,"game4");