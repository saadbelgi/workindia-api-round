const { Router } = require("express");
const db = require("../../database/db");

const router = Router();

router.get("/", async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM short ORDER BY publish_date DESC upvote DESC"
  );``
  res.send(rows);
});

module.exports = router;
