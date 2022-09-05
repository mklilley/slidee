require("dotenv").config();
const express = require("express");
const homeRoute = require("./routes/home");
const decksRoute = require("./routes/decks");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.set("view engine", "hbs");

app.use("/", homeRoute);
app.use("/decks", decksRoute);

app.use(express.static("public"));

module.exports = app;
