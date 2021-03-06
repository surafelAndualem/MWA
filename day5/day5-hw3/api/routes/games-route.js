const express = require("express");
const game = require("../controller/games");
const router = express.Router();

router.get("/games",game.getAllGames).post("/games", game.creatGame);
router.route("/games/:id").get(game.getOneGame).delete(game.deleteGame).put(game.fullUpdateGame);

module.exports = router;
