/**
 * HOSTEL ROUTES
 * ====
 */

var routes 			= require("express").Router();
var Hostel 			= require("../models/hostel");
var middleware = require("../krypton/middleware");



// INDEX route
routes.get("/", middleware.isLoggedIn, (req, res) => {
	Hostel.find({}, (err, foundHostels) => {
		if (err)
			res.json({ error : err });
		res.json({ hostels : foundHostels });
	});
});

// SHOW route
routes.get('/:id', middleware.isLoggedIn, (req, res) => {
	Hostel.findById(req.params.id)
		.populate('category')
		.populate('_creator._id')
		.exec((err, foundHostel) => {
		if (err)
			res.json({ error : err });
		res.json({ hostel : foundHostel });
	});
});

// CREATE
routes.post("/", middleware.isLoggedIn, (req, res) => {
	Hostel.create(req.body, (err, createdHostel) => {
		if (err)
			res.json({ error : err });
		res.json({ msg : "Created a new Hostel " + createdHostel.name });
	});
});

// UPDATE route
routes.put("/:id", middleware.isLoggedIn, (req, res) => {
		Hostel.findByIdAndUpdate(req.params.id,
			{ $set : req.body },
			(err, updatedHostel) => {
			if (err)
				res.json({ error : err });
			res.json({ msg : "Updated hostel " + updatedHostel.name + " Successfully!" });
		});
});

// DELETE route
routes.delete("/:id", middleware.isLoggedIn, (req, res) => {
	Hostel.findByIdAndRemove(req.params.id, (err) => {
		if (err)
			res.json({ error : err });
		res.json({ msg : "Successfully deleted a hostel!" });
	});
});


module.exports = routes;
