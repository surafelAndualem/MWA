
require("./api/data/db.js");
const express= require("express");
const path= require("path");
const app= express();


const routes=require("./api/routes")
app.set("port",3003);
app.use('/css', (req, res, next) => {
    next();
})
app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

app.use("/api",routes)

app.use(express.urlencoded({extended: false}));
app.use(express.json({extended: false}));
const server= app.listen(app.get("port"),
function() {
const port= server.address().port;
});
