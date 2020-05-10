// Initial packages
const express = require("express");
const bodyParser = require("body-parser");
let ejs = require("ejs");

// Ser environment
const app = express();
app.set("view engine", "ejs");
// Use _dirname if you want / to be static
app.use(express.static("public/"));
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
// Global variable declaration:
var day = "";
var items = ["Buy Food", "Cook Food", "Eat Food"];



// Use Date.toLocaleString fomatter.
day = new Date().toLocaleString("en-US", {
  weekday: "long",
  day: "numeric",
  month: "long",
});
console.log(day);
// Home Route Logic
app.get("/", function (req, res) {
  // Date class use system date and default input.

  res.render("list", {
    kindOfDay: day,
    newListItem: items,
    items:items
    
  });
});

// Receive data from List
app.post("/", function (req, res) {
  
  items.push(req.body.newItem);
  res.redirect("/");
  
});
