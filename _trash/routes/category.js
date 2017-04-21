var routes = require("express").Router();
var Category = require("../models/category");
var middleware 	= require("../middleware");


// INDEX route
routes.get("/", middleware.isAdmin, (req, res) => {
	Category.find({}, (err, foundCategories) => {
		if (err)
			req.flash("error", err);
		res.render("category/index", { categories : foundCategories });
	});
});

// NEW route
routes.get("/new", middleware.isAdmin, (req, res) => {
	res.render("category/new");
});

// SHOW route
routes.get("/:id", middleware.isAdmin, (req, res) => {
	Category.findById(req.params.id, (err, foundCategory) => {
		if (err)
			req.flash("error", err);
		res.render("index");
	});
});

// CREATE route
routes.post("/", middleware.isAdmin, (req, res) => {
	Category.create(req.body, (err, createdCategory) => {
		if (err)
			req.flash('error', err);
		else
			req.flash('success', "Created a new category " + createdCategory.name);
		res.redirect('/category');
	});
});

// EDIT route
routes.get("/:id/edit", middleware.isAdmin, (req, res) => {
	Category.findById(req.params.id, (err, foundCategory) => {
		if (err) {
			req.flash(err);
			res.redirect("/category");
		}
		res.render("category/edit", { category : foundCategory });
	});
});


// UPDATE route
routes.put("/:id", middleware.isAdmin, (req, res) => {
	Category.findByIdAndUpdate(req.params.id, { $set : req.body }, (err, updatedCategory) => {
		if (err)
			req.flash('error', err);
		else
			req.flash('success', "Updated Category " + updatedCategory.name);
		res.redirect("/category");
	});
});


// DELETE route
routes.delete("/:id", middleware.isAdmin, (req, res) => {
	Category.findByIdAndRemove(req.params.id, (err) => {
		if (err)
			req.flash('error', err);
		else
			req.flash('success', "Deleted Category Successfully");
		res.redirect("/category");
	});
});



module.exports = routes;
