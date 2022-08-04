const express = require('express')
const app = express()
const path = require("path");
const router = express.Router();
const port = 3000
const pug = require('pug');

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

const dataSample = require('./model/db.js');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/sp-guestbook";

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));


router.get("/", (req, res) => {
  let renderedResponse = "";
  for (i in dataSample) {
    renderedResponse += pug.renderFile("./views/comment.pug", dataSample[i]);
  }
  res.render("index", {content: renderedResponse});
});

router.post("/", (req, res) => {
  console.log(req.body);
  let renderedResponse = pug.renderFile("./views/comment.pug", {name: req.body['name-input-name'], date: "now", text: req.body["name-input-comment"]});
  res.render("index", {content: renderedResponse});
});

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
