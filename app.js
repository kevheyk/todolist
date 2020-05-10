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
let day = "";
let dailyItems = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];



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
    kindOfList: "Daily List",
    kindOfDay: day,
    items:dailyItems,
    // Optional: Use postAction to differentiate which post to render
    postAction: "/"
    
  });
});

// Receive data from Daily List
app.get("/work", function (req, res) {
  
  res.render("list", {
    kindOfList: "Work List",
    kindOfDay: day,
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

