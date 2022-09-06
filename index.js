#! /usr/bin/env node

const open = require("open");

const app = require("./app");

const port = process.env.PORT || 3000;

app.listen(3000, async () => {
    console.log(`Slidee server ready at  http://127.0.0.1:${port}`);
    await open(`http://127.0.0.1:${port}`);
});
