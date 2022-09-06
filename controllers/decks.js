const fs = require("fs");

const decks = require("../models/decks");

let customStyles;
try {
    customStyles = fs.readFileSync("./slidee.css", "utf8");
} catch (e) {}

async function index(req, res) {
    try {
        const allDecks = await decks.find();
        res.render("allDecks", { decks: allDecks });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

async function show(req, res) {
    try {
        const deck = await decks.find({ id: req.params.deckId });
        const content = fs.readFileSync(`${deck.path}`, "utf8");
        res.render("deck", { markdown: content, styles: customStyles });
    } catch (e) {
        res.status(404).json({ error: e.message });
    }
}

module.exports = { index, show };
