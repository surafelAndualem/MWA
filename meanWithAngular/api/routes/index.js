const express=require("express");
const router=express.Router();
const controller=require("../data/games-controller.js")

// router.route("/games").get(controller.gamesGetAll)
// router.route("/games/:gameid").get(controller.gamesGetOne)
//  module.exports=router;


router.route("/games").get(controller.getAllGames).post(controller.addNewGames)
router.route("/games/:gid").get(controller.getOneGame).delete(controller.deleteGame).put(controller.updateGame)
// router.route("/games/:bid/authors").get(controller.getAuthorsForBook).post(controller.addAuthor)
// router.route("/games/:bid/authors/:aid").get(controller.getAuthorById).delete(controller.deleteAuthor).put(controller.updatAuthor)


module.exports=router;