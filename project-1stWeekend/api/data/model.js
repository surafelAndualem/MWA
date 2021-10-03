const mongoose=require("mongoose");

const authorShema=new mongoose.Schema({
   
        name:String,
        age:Number
        
        
        

})
const bookSchame=new mongoose.Schema({
title:String,
publishedYear:Number,
catagory:String,
price:Number,
edition:String,
author:[authorShema]

})

mongoose.model("Book",bookSchame,"Books");