var routes 	= require("express").Router();
var Tenant 	= require("../models/tenant");
var Room 		= require("../models/room");
var krypton = require("../functions/krypton");
var middleware 	= require("../middleware");

// INDEX route
routes.get("/", middleware.isLoggedIn, (req, res) => {
	if (!req.query.room) {
		req.flash('error', "Could not find tenant");
		res.redirect("/hostel");
	}

	// Find the room and populate it's tenants.
	Room.findById(req.query.room).populate('_tenants').exec((err, foundRoom) => {
		if (err) {
			req.flash('error', "Could not find tenant");
			res.redirect("/hostel");
		}
		if (foundRoom._tenants.length > 0) {
				// SEnd its tenants to the tenant index.
				res.render("tenant/index", { tenants : foundRoom._tenants });
		}
		else {
			req.flash("error", "No People in this room!");
			res.redirect("/hostel");
		}
	});
});

// Get all tenants, only for admin
routes.get("/admin", middleware.isAdmin, (req, res) => {
	Tenant.find({}, (err, foundTenants) => {
		if (err)
			throw err;
		res.render("tenant/index-admin", { tenants : foundTenants });
	});
});

// SEARCH form route
routes.get("/search", middleware.isLoggedIn, (req, res) => {
	res.render("tenant/search");
});

// SEARCH Results route
routes.post("/search", middleware.isLoggedIn, (req, res) => {
	Tenant.find({ phone : req.body.phone }, (err, foundTenants) => {
		res.render("tenant/results",
			{
				tenants :  foundTenants,
				_creator: {
					_id : req.user._id
				}
			});
	});
});

// NEW route
routes.get("/new", middleware.isLoggedIn, (req, res) => {
	res.render("tenant/new", { roomId : req.query.room });
});

// CREATE route
routes.post("/", middleware.isLoggedIn, (req, res) => {
	krypton.addTenant(req.body, req.body.room)
		.then(createdTenant => {
			req.flash("success", "Created new Tenant!");
			res.redirect("/hostel");
		})
		.catch(err => {
			req.flash("error", JSON.stringify(err));
			res.redirect("/hostel");
		});
});

// SHOW route
routes.get("/:id", middleware.isLoggedIn, (req, res) => {
	Tenant.findById(req.params.id)
	.populate('Room')
	.exec((err, foundTenant) => {
		if (err) {
			req.flash("error", err);
			res.redirect("/hostel")
		}
		res.render('tenant/show', { tenant : foundTenant });
	});
});

// EDIT route
routes.get("/:id/edit", middleware.isLoggedIn, (req, res) => {
	Tenant.findById(req.params.id).exec((err, foundTenant) => {
		if (err) {
			req.flash("error", err);
			res.redirect("/hostel")
		}
		res.render('tenant/edit', { tenant : foundTenant });
	});
});

// UPDATE route
routes.put("/:id", middleware.isLoggedIn, (req, res) => {
	req.body.room = mongoose.Types.ObjectId(req.body.room);
	Tenant.findByIdAndUpdate(req.params.id, { $set : req.body }, (err, updatedTenant) => {
		if (err)
			req.flash("error", err);
		else
			req.flash("success", "Updated Tenant " + updatedTenant.name + " Successfully!");
		res.redirect("/tenant/" + req.params.id);
	});
});

// DELETE route
routes.delete("/:id", middleware.isLoggedIn, (req, res) => {
	// krypton.removeTenant(tenantId, roomId);
	krypton.removeTenant(req.params.id, req.query.room)
	.then(room => {
		req.flash('success', "Deleted Tenant Successfully");
		res.redirect("/hostel");
	})
	.catch(err => {
		req.flash('error', err);
		res.redirect("/hostel");
	});
});

module.exports = routes;
