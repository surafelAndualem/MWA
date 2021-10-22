const express=require("express");
const router=express.Router();
const controller=require("../data/games-controller.js")



router.route("/games").get(controller.getAllGames).post(controller.addNewGames)
router.route("/games/:gid").get(controller.getOneGame).delete(controller.deleteGame).put(controller.updateGame)

module.exports=router;