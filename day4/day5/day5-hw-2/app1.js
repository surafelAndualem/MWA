
require("./api/data/db.js");
const express= require("express");
const path= require("path");
const app= express();
require("./api/data/students-model")

app.set("port",3000);

const routes=require("./api/routes/students")
app.use(function(req,res,next){
    console.log(req.method,req.url);
    next();
})

app.use(express.json());

app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/api",routes);

const server= app.listen(app.get("port"),
function() {
const port= server.address().port;
});
