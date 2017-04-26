var routes = require("express").Router();
var Category = require("../models/category");


// INDEX route
routes.get("/", (req, res) => {
	Category.find({}, (err, foundCategories) => {
		if (err)
			res.json({ error : err });
		res.json({ categories : foundCategories });
	});
});

// SHOW route
routes.get("/:id",  (req, res) => {
	Category.findById(req.params.id, (err, foundCategory) => {
		if (err)
			req.flash("error", err);
		res.render("index");
	});
});

// CREATE route
routes.post("/", (req, res) => {
	console.log(req.body);
	res.json({ msg : "Created new category " + req.body.name });
	// Category.create(req.body, (err, createdCategory) => {
	// 	if (err)
	// 		req.flash('error', err);
	// 	else
	// 		req.flash('success', "Created a new category " + createdCategory.name);
	// 	res.redirect('/category');
	// });
});


/*
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


*/
module.exports = routes;
