const express=require("express");
const router=express.Router();
const controller=require("../data/games-controller.js")

router.route("/games").get(controller.gamesGetAll)
router.route("/games/:gameid").get(controller.gamesGetOne)
 module.exports=router;