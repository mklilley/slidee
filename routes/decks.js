const router = require("express").Router();

const decksController = require("../controllers/decks");

router.get("/", decksController.index);
router.get("/:deckId", decksController.show);

module.exports = router;
