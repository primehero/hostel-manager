/**
 * HOSTEL ROUTES
 * ====
 */

var routes 			= require("express").Router();
var Hostel 			= require("../models/hostel");
var middleware 	= require("../krypton/middleware");
var mongoose 		= require('mongoose');


// INDEX route
routes.get("/", middleware.isLoggedIn, (req, res) => {
	Hostel.find({})
		.byCreator(req.user)
		.exec((err, foundHostels) => {
		if (err)
			res.json({ error : err });
		res.json({ hostels : foundHostels });
	});
});

// SHOW route
routes.get('/:id', middleware.isLoggedIn, (req, res) => {
	Hostel.rjFindById(
		req.params.id, 'category _creator._id',
		req.user, res );
});

// CREATE route
routes.post("/", middleware.isAdmin, (req, res) => {
	Hostel.create(req.body, (err, createdHostel) => {
		if (err)
			res.json({ error : err });
		res.json({ msg : "Created a new Hostel " + createdHostel.name });
	});
});

// UPDATE route
routes.put("/:id", middleware.isLoggedIn, (req, res) => {
	Hostel.rjFindByIdAndUpdate(
		req.params.id, req.user,
		res, req.body );
});

// DELETE route
routes.delete("/:id", middleware.isAdmin, (req, res) => {
	Hostel.rjFindByIdAndRemove(
		req.params.id, req.user, res );
});


module.exports = routes;
