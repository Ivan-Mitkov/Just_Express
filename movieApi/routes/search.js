var express = require("express");
var router = express.Router();

const movies = require("../data/movies");
const people = require("../data/people");

//for /search query is required
const queryRequired = (req, res, next) => {
  const searchTerm = req.query.query;
  console.log(req.query);
  if (!searchTerm) {
    res.json({ msg: "Query is missing" });
  } else {
    next();
  }
};
//roter level middleware
router.use(queryRequired);

//GET/search/movie
router.get("/movie", (req, res, next) => {
  const searchTerm = req.query.query.toLowerCase();
  const results = movies.filter(movie => {
    let found = false;
    found =
      movie.overview.toLowerCase().includes(searchTerm) ||
      movie.title.toLowerCase().includes(searchTerm);
    return found;
  });

  res.json({ results: results });
});
//GET/search/person
router.get("/person", (req, res, next) => {
  const searchTerm = req.query.query.toLowerCase();
  const results = people.filter(p => {
    let found = p.name.toLocaleLowerCase().includes(searchTerm);
    return found;
  });

  res.json({ results: results });
});
module.exports = router;
