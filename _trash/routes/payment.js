var routes = require("express").Router();
var Payment = require("../models/payment");


// INDEX route
routes.get("/", middleware.isLoggedIn, (req, res) => {
	Payment.find({ tenant : req.query.tenant }, (err, foundPayments) => {
		if (err) {
			req.flash("error", err);
			res.redirect("/tenant/" + req.query.tenant);
		}
		res.render("payment/index", { payments : foundPayments });
	});
});

// CREATE route
routes.post("/", middleware.isLoggedIn, (req, res) => {
	Payment.create(req.body, (err, createdPayment) => {
		if (err)
			req.flash("error", err);
		else
			req.flash("success", "Created new payment!");
		res.redirect("/tenant/" + createdPayment.tenant);
	});
});

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



module.exports = routes;
