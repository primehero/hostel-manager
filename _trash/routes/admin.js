var routes 			= require("express").Router();
var middleware 	= require("../middleware");
var Hostel 			= require("../models/hostel");
var Tenant 			= require("../models/tenant");
var Room 				= require("../models/room");


routes.get("/", middleware.isLoggedIn, function(req, res) {
	Hostel.find({}, (err, foundHostels) => {
		res.render("index");
	});

});

module.exports = routes;
