const router = require("express").Router();
const express = require("express");

const decksController = require("../controllers/decks");

router.get("/", decksController.index);

// This express.static middleware allows local images to be used in the markdown files.
// The route directory that the files are served from is the directory that slidee is 
// launched from.
router.use(express.static("./"));

// This catch all route is required in order to serve slide decks in a way that
// mirrors the file/folder structure on the users computer.
// It is also required for local images to be served relative to the markdown file 
// in which they are referenced.
router.get("/*", decksController.show);


module.exports = router;
