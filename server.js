var express = require('express');
var app     = express();
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/hostel_app_test");

app.use(express.static(
  __dirname + "/public") );

// ROUTES
var catRoutes = require('./routes/category.js');
var hostelRoutes = require('./routes/hostel.js');

app.use("/category",  catRoutes);
app.use("/hostel",    hostelRoutes);


/**
 * ANGULAR APPLICATION route
 */
app.get("/app", (req, res) => {
  res.sendFile( __dirname + "/views/index.html" );
});



app.listen("1337", () => {
  console.log("App running at http://localhost:1337");
});
