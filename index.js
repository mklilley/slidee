#! /usr/bin/env node

const app = require("./app");

const port = process.env.PORT || 3000;

app.listen(3000, () =>
    console.log(`Slidee server ready at  http://127.0.0.1:${port}`)
);
