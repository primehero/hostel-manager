var express         = require('express'),
    app             = express(),
    mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    passport        = require("passport"),
    cookieParser    = require("cookie-parser"),
    LocalStrategy   = require("passport-local"),
    flash           = require("connect-flash"),
    User            = require("./models/user"),
    middleware      = require("./krypton/middleware");


var DB    = process.env.DB    || "mongodb://localhost/hostel_app_test";
var IP    = process.env.IP    || "0.0.0.0";
var PORT  = process.env.PORT  || "1337";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect(DB);
app.use(express.static(
  __dirname + "/public") );

// AUTH
// ====
app.use(cookieParser('secret'));
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   next();
});

// USER CREATOR
// ====
(function() {
  // CREATE route
    var newUser = new User({ username : "Admin" });
    User.register(newUser, :"qqyW7rqQGFYs6Jrb", function(err, user) {
      if (err)
        console.log(err);
    });
})();


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


// Change this to home page.
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/landing.html");
});

// Login route
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

// Login
app.post("/login", passport.authenticate("local",
    {
      successRedirect: "/app",
      failureRedirect: "/login",
      failureFlash: true
    }), function(req, res){
})

/**
 * ANGULAR APPLICATION route
 */
app.get("/app", middleware.isLoggedIn, (req, res) => {
  res.sendFile( __dirname + "/views/index.html" );
});


app.listen(PORT, IP, () => {
  console.log("App running at http://" + IP + ":" + PORT);
});
