const path = require("path");

const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const app = express();
app.use(helmet());

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  if (req.query.msg === "fail") {
    res.locals.msg = "Username and password does not match";
  } else {
    res.locals.msg = "";
  }
  console.log("Locals: ", res.locals);
  next();
});

app.param('id',(req,res,next,id)=>{
    console.log('Params: ',id);
    next();
})

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res, next) => {
  res.send("Connected");
});

app.get("/login", (req, res) => {
  console.log("Query string", req.query);
  res.render("login");
});

app.post("/process_login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // check the db to see if user credentials are valid
  // if they are valid...
  // - save their username in a cookie
  // - is send them to the welcome page
  if (password === "x") {
    res.cookie("username", username);
    res.redirect("/welcome");
  } else {
    res.redirect("/login?msg=fail&test=true");
  }
  // res.json(req.body);
});

app.get("/welcome", (req, res) => {
  // console.log(req.cookies);
  res.render("welcome", {
    //it's new request so req.body is empty
    // username:req.body.username
    username: req.cookies.username
  });
});
app.get("/logout", (req, res) => {
  res.clearCookie("username");
  res.redirect("login");
});
app.get('/story/:id',(req,res)=>{
    res.send(`<h1>Story ${req.params.id} `)
})
app.get('/story/:id/:link',(req,res)=>{
    res.send(`<h1>Story ${req.params.id}/${req.params.link} `)
})
app.get('/statement',(req,res,next)=>{
    res.download(path.join(__dirname,'userStatements','BankStatementChequing.png'),'Statement')
})

app.listen(3000, () => {
  console.log("App is on");
});
