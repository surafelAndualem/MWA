const express = require("express");
const game = require("../controller/games");
const publisher=require("../controller/publisherController")
const router = express.Router();

router.get("/games",game.getAllGames).post("/games", game.creatGame);
router.route("/games/:id").get(game.getOneGame).delete(game.deleteGame).put(game.fullUpdateGame);

router.route("/games/:id/publisher")
.get(publisher.publisherGet)
.post(publisher.publisherAdd);

module.exports = router;
