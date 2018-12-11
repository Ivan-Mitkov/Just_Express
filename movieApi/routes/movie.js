var express = require("express");
var router = express.Router();

const movieDetails = require("../data/movieDetails");
const movies = require("../data/movies");

const requireJSON = (req, res, next) => {
  console.log(req.get("content-type"));
  if (!req.is("application/json")) {
    res.json({ msg: "content type must be application/json" });
  } else {
    next(); //because we use it as middleware in POST and DELETE routes
  }
};
router.param("movieId", (req, res, next) => {
  //hit this wild card
  console.log("Someone hit a route that use movieId");
  next();
});
/* GET movie page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

//GET/movie/top_rated
router.get("/top_rated", (req, res, next) => {
  let page = req.query.page;
  if (!page) {
    page = 1;
  }
  let topRated = movies.slice();
  topRated = movies.sort((x, y) => {
    return y.vote_average - x.vote_average;
  });
  let start = (page - 1) * 20;
  let end = start + 20;
  const result = topRated.slice(start, end);
  console.log("result length", result.length);
  res.json({ result });
  // res.render('index',{result})
});

//GET/movie/movieId
router.get("/:movieId", (req, res, next) => {
  const movieId = req.params.movieId;
  // console.log(req.params.movieId)
  // console.log(movieId)
  //get data
  const movieDetail = movieDetails.find(movie => {
    // console.log(movie.id.toString(),'====',movieId)
    return movie.id.toString() == movieId;
  });
  //find return undefined if not found so:
  if (!movieDetail) {
    res.json({
      msg: "Movie not defined",
      production_companies: []
    });
  } else {
    res.json(movieDetail);
  }
});
//POST/movie/{movieID}/rating
router.post("/:movieId/rating", requireJSON, (req, res, next) => {
  const movieId = req.params.id;
  const userRating = req.body.value; //comes from requirements for the api
  if (userRating < 0.5 || userRating > 10) {
    console.log("Rating: ", userRating);
    res.json({ msg: "User rating must be between 0.5 and 10" });
  } else {
    console.log("Rating: ", userRating);
    res.json({
      status_code: 200,
      msg: "Thank you for submitting your rating"
    });
  }
});
//DELETE/movie/{movieID}/rating
router.delete("/:movieId/rating", requireJSON, (req, res, next) => {
  res.json({ msg: "Rating deleted" });
});
module.exports = router;
