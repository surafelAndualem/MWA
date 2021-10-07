
require("./api/data/db.js");
const express= require("express");
const path= require("path");
const app= express();

app.set("port",3000);
const routes=require("./api/routes")

app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
app.use("/api",routes)

const server= app.listen(app.get("port"),
function() {
const port= server.address().port;
});
