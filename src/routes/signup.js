const { Router } = require("express");
const bcrypt = require("bcrypt");
const db = require("../database/db");
const router = Router();

router.post("/", async (req, res) => {
  const { username, password, email } = req.body;
  if (
    !username ||
    !password ||
    !email ||
    typeof username !== "string" ||
    typeof password !== "string" ||
    typeof email !== "string"
  ) {
    res
      .status(400)
      .send({ status: "Missing required information", status_code: 400 });
    return;
  }

  const hash = await bcrypt.hash(password, 10);
  try {
    const row = (
      await db.query(
        "INSERT INTO user (username, password, email) VALUES (?, ?, ?)",
        [username, hash, email]
      )
    )[0];
    res.status(200).send({
      status: "Account successfully created",
      status_code: 200,
      user_id: row.insertId,
    });
  } catch (err) {
    res.status(400).send({
      status: "Account creation failed: " + err.sqlMessage,
      status_code: 400,
    });
    console.error(err);
  }
});

module.exports = router;
