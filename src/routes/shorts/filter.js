const { Router } = require("express");
const db = require("../../database/db");
const jwt = require("jsonwebtoken");

const router = Router();

router.get("/", async (req, res) => {
  if (!req.headers["authorization"]) {
    res.status(401).send({ message: "Unauthorized", status_code: 401 });
    return;
  }
  try {
    const token = jwt.verify(
      req.headers["authorization"],
      process.env.JWT_SECRET
    );
  } catch (err) {
    res.status(401).send({ message: "Unauthorized", status_code: 401 });
    return;
  }
  const query = req.query.query;
  if (!query) {
    res
      .status(400)
      .send({ message: "Missing query parameter", status_code: 400 });
    return;
  }
  console.log(query);
  try {
    const a = JSON.parse(query);
    const filter = a.filter;
    const search = a.search;
    let category, upvote, title, author;
    if (filter) {
      category = filter.category;
      upvote = parseInt(filter.upvote);
    }
    if (search) {
      title = search.title;
      author = search.author;
    }
    let q = "SELECT * FROM short WHERE";
    if (category) {
      q += ` category='${category}' AND`;
    }
    if (upvote) {
      q += ` upvote>${upvote}`;
    } else {
      q = q.slice(0, -4);
    }
    if (title) {
      q += ` AND (title LIKE '%${title}%' OR`;
    } else {
      q += " OR ( ";
    }
    if (author) {
      q += ` author LIKE '%${author}%')`;
    }
    // console.log(q);
    const [rows] = await db.query(q);
    if (rows.length === 0) {
      res.status(400).send({
        status: "No short matches your search criteria",
        status_code: 400,
      });
      return;
    } else {
      res.send(
        rows.map((val) => {
          return {
            val,
            contains_title: val.title
              .toLowerCase()
              .includes(title ? title.toLowerCase() : ""),
            contains_author: val.author
              .toLowerCase()
              .includes(author ? author.toLowerCase() : ""),
          };
        })
      );
    }
  } catch (err) {
    console.error(err);
    res.status(400).send({
      message:
        "Invalid query. Make sure for query is stringified JSON and fields are correct",
      status_code: 400,
    });
    return;
  }
});

module.exports = router;
