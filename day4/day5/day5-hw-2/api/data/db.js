require("./students-model.js")
const mongoose =require("mongoose");
const dbname="SchoolDB";
const dburl="mongodb://localhost:27017/" +dbname;

mongoose.connect(dburl,{useNewUrlParser: true},{useUnifiedTopology:true});
mongoose.connection.on("connected",function(){
    console.log("mongoose connected to "+dburl);

})
mongoose.connection.on("disconnected",function(){
    console.log("mongoose disconnected");
})

mongoose.connection.on("error",function(err){
console.log("mongoose connection error " +err);
})

process.on("SIGINT",function(){
    mongoose.connection.close(function(){
        console.log("mongoose disconnected by app termination");
        process.exit(0);
    })
})

process.on("SIGTERM",function(){
    mongoose.connection.close(function(){
        console.log("mongoose disconnected by app termination");
        process.exit(0);
    })
})
process.once("SIGUSR2",function(){
    mongoose.connection.close(function(){
        console.log("mongoose disconnected by app termination");
        process.kill(process.pid,"SIGUSR2");
    });
});