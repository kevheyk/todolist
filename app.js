// Initial packages
const express = require("express");
const bodyParser = require("body-parser");
let ejs = require("ejs");
const mongoose = require("mongoose");

// local module
const date = require(__dirname + "/date.js");

console.log(date)

// Ser environment
const app = express();
app.set("view engine", "ejs");

// Connect to DB
mongoose.connect("mongodb://localhost:27017/todolistDB",{
   useNewUrlParser: true ,
   useUnifiedTopology: true
  }, function(err){
    if (err){
      console.log(err);
    } else {
      console.log("MongoDB Connected Successfully");
    }
  });

// Set Item Schema
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true
  }
});
// Create collection
const Item = mongoose.model("Item", itemSchema);

// Use _dirname if you want / to be static
app.use(express.static("public/"));
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
// Global variable declaration:

// In JS, CONST allows manipulation INSIDE variable, not re-pointing
const dailyItems = ["Buy Food", "Cook Food", "Eat Food"];

// Create sample items

const item1 = new Item ({
  name: "Buy Food"
});

const item2 = new Item ({
  name: "Cook Food"
});

const item3 = new Item ({
  name: "Eat Food"
});

dailyItem = [item1.name, item2.name, item3.name]

const workItems = [];



// Home Route Logic
app.get("/", function (req, res) {
  // Date class use system date and default input.
  res.render("list", {
    kindOfList: "Daily List",
    kindOfDay: date.getDate(),
    items:dailyItems,
    // Optional: Use postAction to differentiate which post to render
    postAction: "/"
    
  });
});

// Receive data from Daily List
app.get("/work", function (req, res) {
  
  res.render("list", {
    kindOfList: "Work List",
    kindOfDay: date.getDate(),
    items:workItems,
    // Optional: Set this one to "/work" to activate postAction directing.
    postAction: "/"
  });
  
});


// Receive data from Daily List
app.post("/", function (req, res) {
  // Use button value to direct which list to GET
  switch(req.body.kindOfList){
    case "Daily List":
      dailyItems.push(req.body.newItem);
      res.redirect("/");
      break;
    case "Work List":
      workItems.push(req.body.newItem);
      res.redirect("/work")
      break;
    default:
      console.log("What? This new item is from somewhere else!"+req.body.kindOfList+".")
  }
    
  
});
// Optional. Not working as I have set postAction always "/".
// Receive data from Work List
app.post("/work", function (req, res) {
  console.log(req.body);
  workItems.push(req.body.newItem);
  res.redirect("/work");

});

