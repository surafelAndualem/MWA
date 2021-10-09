require("./api/data/db");
const express=require("express");
const path=require("path");
const app=express();
app.set("port",4000);
require("./api/data/model")

const routes=require("./api/route/route-index")



app.set("port",3000);
app.use('/css', (req, res, next) => {
    next();
})
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

app.use("/api",routes)

app.use(express.urlencoded({extended: false}));
app.use(express.json({extended: false}));
const server= app.listen(app.get("port"),
function() {
const port= server.address().port;
});


// app.use(function(req,res,next){
// console.log(req.method,req.url);
// next;
// })


// app.use('/css', (req, res, next) => {
//       next();
//   })
// app.use(express.json());
// // app.get("/",function(req,res){
// //     console.log("get received");
// //     res.status(200).sendFile(path.join(__dirname,"public","index.html"))

// // })
// //app.use(express.json());
// app.use(express.static(path.join(__dirname, "public")));

//  //app.use("/public",express.static(path.join(__dirname,"public")));
//   app.use("/api",routes);
//   app.use(express.urlencoded({extended: false}));
// app.use(express.json({extended: false}));
// const server=app.listen(app.get("port"),
// function(){
//     const port=server.address().port;
// })