var express = require("express");
var router = express.Router();

//get data
const movies = require("../data/movies");
/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/most_popular", function(req, res, next) {
  //get the page variable from the query string
  let page = req.query.page;
  if (page === undefined) {
    page = 1;
  }
  //check the api key
  if (req.query.api_key !== "123456789") {
    res.json("Invalid api key");
  } else {
    let mostPopular = movies.filter(movie => movie.most_popular);
    const resPerPage = 20;
    const startPage = page * resPerPage - resPerPage;
    const endPage = startPage + resPerPage-1;
    mostPopular = mostPopular.slice(startPage, endPage);
    res.json({results:mostPopular});
  }
});

module.exports = router;
