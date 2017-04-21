var express = require('express');
var app     = express();
var mongoose = require("mongoose");

var DB    = process.env.DB    || "mongodb://localhost/hostel_app_test";
var IP    = process.env.IP    || "0.0.0.0";
var PORT  = process.env.PORT  || "1337";

mongoose.connect(DB);
app.use(express.static(
  __dirname + "/public") );

// ROUTES
// ====
var catRoutes       = require('./routes/category.js');
var hostelRoutes    = require('./routes/hostel.js');
var roomRoutes      = require('./routes/room.js');
var paymentRoutes   = require('./routes/payment.js');
var tenantRoutes    = require('./routes/tenant.js');
var userRoutes      = require('./routes/user.js');

app.use("/category",  catRoutes);
app.use("/hostel",    hostelRoutes);
app.use("/room",      roomRoutes);
app.use("/payment",   paymentRoutes);
app.use("/tenant",    tenantRoutes);
app.use("/user",      userRoutes);


/**
 * ANGULAR APPLICATION route
 */
app.get("/app", (req, res) => {
  res.sendFile( __dirname + "/views/index.html" );
});


app.listen(PORT, IP, () => {
  console.log("App running at http://" + IP + ":" + PORT);
});
