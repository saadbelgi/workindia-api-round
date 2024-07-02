const { Router } = require("express");
const db = require("../../database/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const router = Router();

router.post("/", async (req, res) => {
  if (req.headers["authorization"] !== process.env.ADMIN_API_KEY) {
    res.status(401).send({ status: "Unauthorized", status_code: 401 });
    return;
  }
  const {
    category,
    title,
    author,
    publish_date,
    content,
    actual_content_link,
    image,
    votes,
  } = req.body;
  if (
    !category ||
    !title ||
    !author ||
    !publish_date ||
    !content ||
    !actual_content_link ||
    typeof category !== "string" ||
    typeof title !== "string" ||
    typeof author !== "string" ||
    typeof publish_date !== "string" ||
    typeof actual_content_link !== "string" ||
    typeof content !== "string"
  ) {
    res.status(400).send({ message: "Invalid request body", status_code: 400 });
    return;
  }
  let upvote, downvote;
  if (votes) {
    upvote = votes.upvote;
    downvote = votes.downvote;
  }
  if (
    (upvote && (typeof upvote !== "number" || upvote < 0)) ||
    (downvote && (typeof downvote !== "number" || downvote < 0))
  ) {
    res.status(400).send({ message: "Invalid request body", status_code: 400 });
    return;
  }
  let publish_date_date;
  try {
    publish_date_date = new Date(publish_date);
    console.log(publish_date);
  } catch (err) {
    res.status(400).send({ message: "Invalid request body", status_code: 400 });
    return;
  }

  try {
    const row = (
      await db.query(
        "INSERT INTO short (category, title, publish_date, content, actual_ content_link, image, upvote, downvote) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          category,
          title,
          publish_date_date,
          content,
          actual_content_link,
          typeof image === "string" ? image : null,
          upvote ? upvote : 0,
          downvote ? downvote : 0,
        ]
      )
    )[0];
    res.status(200).send({
      message: "Short added successfully",
      short_id: row.insertId,
      status_code: 200,
    });
  } catch (err) {
    res.status(400).send({
      message: "Short couldn't be added: " + err.sqlMessage,
    });
    console.error(err);
  }
});

module.exports = router;
