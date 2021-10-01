const express= require("express");
const path= require("path");
//const rout=require("./api/routes")

const routes=require("./api/routes")
const app= express();
app.set("port",3000);


app.use(function(req,res,next){
    console.log(req.method,req.url);
    next();
})

app.use(express.static(path.join(__dirname, "public")));

app.use("/api",routes)


const server= app.listen(app.get("port"),
function() {
const port= server.address().port;
});
