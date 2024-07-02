const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./src/routes/index");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", indexRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
