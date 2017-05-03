var routes = require("express").Router();
var Payment = require("../models/payment");
var Tenant = require("../models/tenant");
var middleware = require("../krypton/middleware");


// INDEX route
routes.get("/", middleware.isLoggedIn, (req, res) => {
	Payment.find({})
		.populate('tenant')
		.exec((err, foundPayments) => {
			if (err)
				res.json({ error : err });
			res.json({ payments : foundPayments });
	});
});

// CREATE route
routes.post("/", middleware.isLoggedIn, (req, res) => {
	Payment.create(req.body, (err, createdPayment) => {
		if (err)
			res.json({ error : err });
		// Find it's tenant	
		Tenant.findById(createdPayment.tenant, (err, foundTenant) => {
			if (err)
				res.json({ error : err });	
			// Copy creator
			createdPayment._creator = foundTenant._creator;
			createdPayment.save((err) => {
				if (err)
					res.json({ error : err });
				res.json({ msg : "Created new payment!" });		
			});
		});			
	});
});

// SHOW route
routes.get("/:id", middleware.isLoggedIn, (req, res) => {
	Payment.findById(req.params.id)
	 	.populate('tenant')
		.exec((err, foundPayment) => {
			if (err)
				res.json({ error : err });
			res.json({ payment : foundPayment });
	});
});

// UPDATE route
routes.put("/:id", middleware.isLoggedIn, (req, res) => {
	Payment.findByIdAndUpdate(req.params.id, { $set : req.body }, (err, updatedPayment) => {
		if (err)
			res.json({ error : err });
		res.json({ msg : "Updated payment Successfully!" });		
	});
});

// DELETE route
routes.delete("/:id", middleware.isLoggedIn, (req, res) => {
	Payment.findByIdAndRemove(req.params.id, (err) => {
		if (err)
			res.json({ error : err });
		res.json({ msg : "Deleted payment Successfully!" });		
	});
});



/*

// NEW route
routes.get("/new", middleware.isLoggedIn, (req, res) => {
	// Show a form.
	// It has a query called tenant, send it's details to the template so that it
	// can use it in create.
	res.render("payment/new", { tenantId : req.query.tenant });
});

// SHOW route
routes.get("/:id", middleware.isLoggedIn, (req, res) => {
	Payment.findById(req.params.id, (err, foundPayment) => {
		if (err) {
			req.flash("error", err);
			req.redirect("/hostels");
		}
		res.render("payment/show", { payment : foundPayment });
	});
});

// EDIT route
routes.get("/:id/edit", middleware.isLoggedIn, (req, res) => {
	Payment.findById(req.params.id, (err, foundPayment) => {
		if (err) {
			req.flash("error", err);
			req.redirect("/hostels");
		}
		res.render("payment/edit", { payment : foundPayment });
	});
});

// UPDATE route
routes.put("/:id", middleware.isLoggedIn, (req, res) => {
	Payment.findByIdAndUpdate(req.params.id, { $set : req.body }, (err, updatedPayment) => {
		if (err) {
			req.flash("error", err);
			req.redirect("/hostels");
		}
		req.flash("success", "Updated payment Successfully!");
		res.redirect("/payment/" + req.params.id);
	});
});

// DELETE route
routes.delete("/:id", middleware.isLoggedIn, (req, res) => {
	Payment.findByIdAndRemove(req.params.id, (err) => {
		if (err) {
			req.flash("error", err);
			req.redirect("/hostels");
		}
		req.flash("success", "Deleted payment Successfully!");
		res.redirect("/hostel");
	});
});

*/

module.exports = routes;
