const { Router } = require("express");
const db = require("../database/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  if (
    !username ||
    !password ||
    typeof username !== "string" ||
    typeof password !== "string"
  ) {
    res
      .status(400)
      .send({ status: "Missing required information", status_code: 400 });
    return;
  }
  const rows = (
    await db.query("SELECT user_id, password FROM user WHERE `username` = ?", [
      username,
    ])
  )[0];
  console.log(rows);
  if (rows.length == 0 || !(await bcrypt.compare(password, rows[0].password))) {
    res.status(401).send({
      status: "Incorrect username/password provided. Please retry",
      status_code: 401,
    });
  } else {
    const access_token = jwt.sign(
      { user_id: rows[0].user_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).send({
      status: "Login successful",
      status_code: 200,
      user_id: rows[0].user_id,
      access_token,
    });
  }
});

module.exports = router;
