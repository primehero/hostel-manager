var routes 		= require('express').Router();
var Tenant 		= require('../models/tenant');
var Room 			= require('../models/room');
var Hostel 		= require('../models/room');
var waterfall	=	require('async-waterfall');



// INDEX route
routes.get("/", (req, res) => {
	Tenant.find({})
		.lean()
		.populate('room')
		.exec((err, foundTenants) => {
			if (err)
				res.json({ error : err });
			Hostel.populate(foundTenants, {
				path: 'room.hostel'
			}, function(err, foundTenants) {
				if (err)
					res.json({ error : err });
				res.json({ tenants : foundTenants });
			});
		});

});

// CREATE route

/*
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
*/

module.exports = routes;
