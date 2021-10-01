const express=require("express");
const router=express.Router();
const controllerGames=require("../controllers/games.controllers.js");
router.route("/games").get(controllerGames.gameGetAll)

 module.exports=router;