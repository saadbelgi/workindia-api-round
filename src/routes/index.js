// this is the main route file, it will be used to define all the routes in the application

const { Router } = require("express");
const signupRouter = require("./signup");
const loginRouter = require("./login");

const router = Router();

router.use("/signup", signupRouter);
router.use("/login", loginRouter);

router.all("*", (req, res) => {
  res.status(404).send({ message: "Endpoint does not exist" });
});

module.exports = router;
