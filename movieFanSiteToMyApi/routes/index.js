const express = require("express");
const router = express.Router();
const request = require("request");

const apiKey = '123456789';

// const apiBaseUrl = "http://api.themoviedb.org/3";
const apiBaseUrl = "http://localhost:3030";

const nowPlayingUrl = `${apiBaseUrl}/most_popular?api_key=${apiKey}`;
const imageBaseUrl = "http://image.tmdb.org/t/p/w300";

router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next();
});
/* GET home page. */
router.get("/", (req, res, next) => {
  //args(url, callback to run when http response is back)
  //callback args(error, http response, json/data the server send)
  request.get(nowPlayingUrl, (err, response, data) => {
    console.log('Error: ',err)
    // console.log('Response: ',response)
    // console.log('Data: ',data)
    const parsedData = JSON.parse(data);
    //send to web page for looking
    // res.json(parsedData);
    res.render("index", { parsedData: parsedData.results });
  });
});

router.get("/movie/:id", (req, res, next) => {
  const movieId = req.params.id;
  const thisMovieYrl = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`;
  request.get(thisMovieYrl, (err, response, data) => {
    const parsedData = JSON.parse(data);
    res.render("single-movie", { movie: parsedData });
  });
});

router.post("/search", (req, res, next) => {
  // res.send("Working")
  // console.log(req.body);
  const cat = req.body.cat;
  const search = encodeURI(req.body.movieSearch);
  
  const url = `https://api.themoviedb.org/3/search/${cat}?api_key=${apiKey}&language=en-US&query=${search}&page=1&include_adult=true`;
  request.get(url, (err, response, data) => {
    const parsedData = JSON.parse(data);
    // console.log(parsedData);
    // res.json(parsedData);
    let toRender = cat === "movie" ? "searched" : "actors";
    res.render(toRender, { parsedData: parsedData.results, searched: req.body.movieSearch });
  });
});


module.exports = router;
