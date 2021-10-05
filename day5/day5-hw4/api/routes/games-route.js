const express = require("express");
const game = require("../controller/games");
const publisher=require("../controller/publisherController")
const router = express.Router();

router.get("/games",game.getAllGames).post("/games", game.creatGame);
router.route("/games/:id").get(game.getOneGame).delete(game.deleteGame).put(game.fullUpdateGame);
router.route("/publisher").get(publisher.getAllPublisher).post(publisher.createPublisher)
//router.route("/publisher").get(publisher.getAllPublisher)
router.route("/publisher/:id").get(publisher.getOnePublisher).put(publisher.fullUpdatePublisher)
.delete(publisher.deletePublisher)

// router.route("/games/:id/publisher")
// .get(publisher.publisherGet)
// .post(publisher.publisherAdd);

module.exports = router;
