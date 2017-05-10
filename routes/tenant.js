var routes 		= require('express').Router();
var Tenant 		= require('../models/tenant');
var Room 		= require('../models/room');
var Hostel 		= require('../models/room');
var waterfall	=	require('async-waterfall');
var middleware 	= require("../krypton/middleware");




// INDEX route
routes.get("/", middleware.isLoggedIn, (req, res) => {
	Tenant.find({})
		.byCreator(req.user)
		.populate('room')
		.populate('hostel')
		.exec((err, foundTenants) => {
			if (err)
				res.json({ error : err });
			res.json({ tenants : foundTenants });
	});
});

// SHOW route
routes.get("/:id", middleware.isLoggedIn, (req, res) => {
	Tenant.rjFindById(
		req.params.id, 'hostel',
		req.user, res );
});


// CREATE route
routes.post("/", middleware.isLoggedIn, (req, res) => {
	Tenant.create(req.body, (err, createdTenant) => {
		if (err)
			res.json({ error : err });
		// Find room by id and copy _creator.
		Room.findById(req.body.room, (err, foundRoom) => {
			if (err)
				res.json({ error : err });
			// Add creator.
			createdTenant._creator  = foundRoom._creator;
			createdTenant.save(err => {
				if (err)
					res.json({ error : err });
				res.json({ msg : "Created new Tenant: " + createdTenant.name });
			});
		});
	});
});


// UPDATE route
routes.put("/:id", middleware.isLoggedIn, (req, res) => {
	Tenant.rjFindByIdAndUpdate(
		req.params.id, req.user,
		res, req.body );
});


// DELETE route
routes.delete("/:id", middleware.isLoggedIn, (req, res) => {
	Tenant.rjFindByIdAndRemove(
		req.params.id, req.user, res );
});




module.exports = routes;
