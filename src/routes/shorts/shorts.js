const { Router } = require("express");
const createRouter = require("./create");
const feedRouter = require("./feed");
const filterRouter = require("./filter");
const db = require("../../database/db");

const router = Router();

router.use("/create", createRouter);
router.use("/feed", feedRouter);
router.use("/filter", filterRouter);

module.exports = router;
