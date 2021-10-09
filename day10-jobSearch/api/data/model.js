const mongoose = require("mongoose");

const locationSchema=new mongoose.Schema({
    city:String,
    streetAddres:String
})

const jobSchema=new mongoose.Schema({
title: String,
salary: Number,
location:[locationSchema],
description: String,
experience: String,
skill:[{
    type:String,
    programmingLang: String,
    technologies: String
}],
postDate:Date   

})

mongoose.model("Job",jobSchema,"jobs");