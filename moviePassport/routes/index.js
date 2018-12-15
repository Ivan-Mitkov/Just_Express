const express = require("express");
const router = express.Router();
const request = require("request");
const passport = require("passport");

//my api key for https://www.themoviedb.org/
const apiKey = require("../apiKey").api;

// const apiKey = '123456789';
const apiBaseUrl = "http://api.themoviedb.org/3";
// const apiBaseUrl = "http://localhost:3030";

const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?page=1&language=en-US&api_key=${apiKey}`;
const imageBaseUrl = "http://image.tmdb.org/t/p/w300";

router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
});
/* GET home page. */
router.get("/", (req, res, next) => {
  //req.user from passport
  // In this example, only the user ID is serialized to the session,
  //keeping the amount of data stored within the session small.
  //When subsequent requests are received, this ID is used to find the user,
  // which will be restored to req.user.
  console.log("req.user: ", req.user);
  request.get(nowPlayingUrl, (err, response, data) => {
    console.log("Error: ", err);
    const parsedData = JSON.parse(data);
    res.render("index", { parsedData: parsedData.results });
  });
});

//login route
router.get("/login", passport.authenticate("github"));
router.get("/favorites", (req, res) => {
  res.json(req.user);
});
//for callback where github send where WE told him to send
//redirect is commonly issued after authenticating a request.
router.get(
  "/auth",
  passport.authenticate("github", {
    successRedirect: "/",
    failureRedirect: "/loginfail"
  })
);
//============
router.get("/movie/:id", (req, res, next) => {
  const movieId = req.params.id;
  const thisMovieYrl = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`;
  request.get(thisMovieYrl, (err, response, data) => {
    const parsedData = JSON.parse(data);
    res.render("single-movie", { movie: parsedData });
  });
});

router.post("/search", (req, res, next) => {
  const userSearchTerm = encodeURI(req.body.movieSearch);
  const cat = req.body.cat;
  const movieUrl = `${apiBaseUrl}/search/${cat}?query=${userSearchTerm}&api_key=${apiKey}&include_adult=true`;
  request.get(movieUrl, (err, response, data) => {
    const parsedData = JSON.parse(data);
    let toRender = cat === "movie" ? "searched" : "actors";
    res.render(toRender, {
      parsedData: parsedData.results,
      searched: req.body.movieSearch
    });
  });
});

module.exports = router;
