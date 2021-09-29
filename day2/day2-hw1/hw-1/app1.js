const express=require("express");
const app=express();
app.set("port",5353);
app.get("/", function(req, res) {
    console.log("GET received");
    res.send("Received your GET request.");
    });
const server=app.listen(app.get("port"),function(){
    console.log("listenig to port : " ,server.address().port);
})