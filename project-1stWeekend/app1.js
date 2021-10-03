
require("./api/data/db.js")
const express=require("express")
const path= require("path");
const app=express();

const routes=require("./api/route/rout_index.js")
require("./api/data/model.js")
app.set("port",3000);

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