const express = require("express");

const app = express();

//create middleware
const validateUser = (req, res, next) => {
  res.locals.validated = false;
  next();
};
const validateAdmin = (req, res, next) => {
  res.locals.validated = true;
  next();
};

//use middleware
app.use(validateUser);
app.use('/admin',validateAdmin);

app.get("/", (req, res, next) => {
  console.log('user: ',res.locals);
  res.send(`<h1> Home</h1>`);
});
app.get("/admin", (req, res, next) => {
  console.log('admin: ',res.locals);
  res.send(`<h1> Admin</h1>`);
});

app.listen(3000, () => {
  console.log(`app listen 3000`);
});
