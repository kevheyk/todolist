// Initial packages
const express = require("express");
const bodyParser = require("body-parser");
let ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

// local module
const date = require(__dirname + "/date.js");

console.log(date)

// Ser environment
const app = express();
app.set("view engine", "ejs");

// Connect to DB
mongoose.connect("mongodb+srv://admin-kevin:Api=123456@cluster0-jhuob.mongodb.net/todolistDB",{
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
  },
  category:{
    type: String,
    required:true,
    enum:['Daily','Work','Secret']
  },
  status:{
    type: String,
    required:true,
    enum:['Checked', 'Unchecked']
  }
});
// Create collection
const Item = mongoose.model("Item", itemSchema);

// Use _dirname if you want / to be static
app.use(express.static("public/"));
app.use(bodyParser.urlencoded({ extended: true }));
// Local and Heroku
app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
// Global variable declaration:

// In JS, CONST allows manipulation INSIDE variable, not re-pointing
// Home Route Logic

app.get("/", function (req, res) {
  res.redirect("work-list");
})


// Free Route Logic
app.get("/:kindList-List", function (req, res) {
  
  const route_params = _.startCase(req.params.kindList);
  // Read data from DB
  Item.find({category:route_params},{},function(err, items){
    if(err){
      console.log(err);
    } else{
      console.log("Return items: " + items);
      
      res.render("list", {
        kindOfList: route_params + " List",
        kindOfDay: date.getDate(),
        items:items,
        // Optional: Use postAction to differentiate which post to render
        postAction: "/"+route_params+"-List"
        
      });
    }

  })

});


// Receive data from Daily List
app.post("/:kindOfList-List", function (req, res) {
  const route_params = _.startCase(req.params.kindOfList);
  console.log(req.body);
  // Use button value to direct which list to GET

      Item.findOneAndUpdate(
        {name:req.body.newItem},
        new Item({
          name:req.body.newItem,
          category:route_params,
          status:"Unchecked"
        }),
        {upsert:true,
        runValidators: true},
        function(err){
          if(err){
            console.log(err);
          } 
          res.redirect("back");
          
        })
  
    
  
});


// Clear All Data
app.get("/clear", function (req, res) {

  Item.deleteMany({status:"Checked"},function(err){
    if(err){
      console.log(err);
    } else {
      res.send("Success Clear Checked Data");
    }
  });
});

app.get("/clear-all", function (req, res) {

  Item.deleteMany({},function(err){
    if(err){
      console.log(err);
    } else {
      console.log("Success Clear All Data");
    }
      res.send("Success Clear All Data");
  });
});


app.post("/check", (req, res)=>{
  for (const [key, value] of Object.entries(req.body)){

    Item.updateOne({name:key},{$set:{status:value}},(err,doc)=>{
      // Item.findOneAndUpdate({name:key},{$set:{status:value}},(err,doc)=>{
      if (err){
        console.log(err);
      } 
      res.redirect("back");
      console.log(req.body);
    })
    
  }
});