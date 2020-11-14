const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js")



const app = express();

var items = ["buy food", "cook food", "eat food"];
var workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static("public"));

app.get("/", function(req, res) {

  const day = date.getDate();

  res.render('list', {
    listTitles: day,
    newListItems: items
  })
})

app.post("/", function(req, res) {
  var item = req.body.newText;

  if (req.body.list === "work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

})

app.get("/work", function(req, res) {
  res.render('list', {
    listTitles: "work List",
    newListItems: workItems
  });
})

app.post("/work", function(req, res) {
  var item = req.body.newText;
  workItems.push(item);
  res.redirect("/work");
})

app.get("/about", function(req, res) {
  res.render("about");
})

app.listen(3000, function() {
  console.log("server is running on port 3000");
})
