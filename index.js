#! /usr/bin/env node

require("dotenv").config();
const open = require("open");

console.log("Building list of slide decks...");
const app = require("./app");

const port = process.env.SLIDEE_PORT || 3000;

app.listen(3000, async () => {
    console.log(`Slidee server ready at  http://127.0.0.1:${port}`);
    await open(`http://127.0.0.1:${port}`);
});
