const path = require("path");
const express = require("express");
const homeRoute = require("./routes/home");
const decksRoute = require("./routes/decks");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, 'views'))



app.use("/", homeRoute);
app.use("/decks", decksRoute);

// This express.static middleware will catch requests for "assets" i.e. the reveal.js JS and CSS files.
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
