var routes = require("express").Router();
var Category = require("../models/category");
var middleware = require("../krypton/middleware");



// INDEX route
routes.get("/", middleware.isLoggedIn, (req, res) => {
	Category.find({}, (err, foundCategories) => {
		if (err)
			res.json({ error : err });
		res.json({ categories : foundCategories });
	});
});

// SHOW route
routes.get("/:id", middleware.isLoggedIn, (req, res) => {
	Category.findById(req.params.id, (err, foundCategory) => {
		if (err)
			res.json({ error : err });
		res.json({ category : foundCategory });
	});
});

// CREATE route
routes.post("/", middleware.isLoggedIn, (req, res) => {
	Category.create(req.body, (err, createdCategory) => {
		if (err)
			res.json({ error : err });
		res.json({ msg : "Created a new category '" + createdCategory.name + "'" });
	});
});

// UPDATE route
routes.put("/:id", middleware.isLoggedIn, (req, res) => {
	Category.findByIdAndUpdate(req.params.id, { $set : req.body },
		(err, updatedCategory) => {
			if (err)
				res.json({ error : err });
			res.json({ msg: "Updated Category " + updatedCategory.name });
	});
});

// DELETE route
routes.delete("/:id", middleware.isLoggedIn, (req, res) => {
	Category.findByIdAndRemove(req.params.id, (err) => {
		if (err)
			res.json({ error : err });
		res.json({ msg : "Deleted Category Successfully" });
	});
});


module.exports = routes;
