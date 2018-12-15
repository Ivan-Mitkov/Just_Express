const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
//github passport config
const GITHUB_CLIENT_SECRET = require("./apiKey").GITHUB_CLIENT_SECRET;
const GITHUB_CLIENT_ID = require("./apiKey").GITHUB_CLIENT_ID;
///PASSPORT FILES
//session is not connected only to passport
const session=require('express-session');
const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
//...............

const helmet = require("helmet");

const indexRouter = require("./routes/index");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(helmet());
//===========PASSPORT CONFIG=============
//session 
app.use(session({
  secret: 'Some bulshit not matter what',
  resave: false,
  saveUninitialized: true,
 
}))
//session end
app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      //change from http://127.0.0.1:3000/auth/github/callback to:
      callbackURL: "http://localhost:3000/auth"
    },
    function(accessToken, refreshToken, profile, cb) {
      // console.log(profile);
      return cb(null,profile)
    }
  )
);
passport.serializeUser((user,cb)=>{
  cb(null,user.id)
});
passport.deserializeUser((user,cb)=>{
  cb(null,user)
})
//====================
app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
