const express = require("express");
const helmet = require("helmet");

const app = express();

//add helmet up in the air
app.use(helmet());

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/ajax", (req, res, next) => {
  console.log(req.body);
  //res.send is sending headers Content-Type text/html
  //   res.send(`Test`);
  //res.json is sending headers Content-Type application/json and promises can read it
  res.json("Test");
});

app.listen(3000, () => {
  `app is running`;
});
