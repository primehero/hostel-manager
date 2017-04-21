var express = require('express');
var app     = express();
var mongoose = require("mongoose");

const DB =
  process.env.DB | "mongodb://localhost/hostel_app_test";
const IP    = process.env.IP | "0.0.0.0";
const PORT  = process.port.PORT | "1337";

mongoose.connect(DB);
app.use(express.static(
  __dirname + "/public") );

// ROUTES
// ====
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


app.listen(PORT, IP, () => {
  console.log("App running at http://" + IP + ":" + PORT);
});
