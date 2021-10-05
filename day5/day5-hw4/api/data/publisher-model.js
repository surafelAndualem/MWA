const mongoose=require("mongoose");

const publisherSchema=new mongoose.Schema({ 
    name:{
        type:String,
        required:true
    },
    address:{
       // type:String,
        city:String,
        phone:Number
    
    }
});

 mongoose.model("Publisher",publisherSchema,"publisher")