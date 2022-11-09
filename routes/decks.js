const router = require("express").Router();
const express = require("express");

const decksController = require("../controllers/decks");

router.use(express.static("./"));
router.get("/", decksController.index);
router.get("/*", decksController.show);


module.exports = router;
