var express = require('express');
var router = express.Router();

const movieDetails=require('../data/movieDetails');
/* GET movie page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//GET/movie/movieId
router.get('/:movieId',(req,res,next)=>{
  const movieId=req.params.movieId;
          // console.log(req.params.movieId)
          // console.log(movieId)
  //get data
  const movieDetail=movieDetails.find((movie)=>{
    // console.log(movie.id.toString(),'====',movieId)
    return movie.id.toString()==movieId;
  });
  //find return undefined if not found so:
  if(!movieDetail){
    
   res.json({
     msg:"Movie not defined",
     production_companies:[]
   });
  }else{
    res.json(movieDetail);
  }
 

})

//GET/movie/top_rated

//POST/movie/{movieID}/rating

//DELETE/movie/{movieID}/rating


module.exports = router;
