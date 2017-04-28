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
			res.json({ error : err });
		res.json({ category : foundCategory });
	});
});

// CREATE route
routes.post("/", (req, res) => {
	Category.create(req.body, (err, createdCategory) => {
		if (err)
			res.json({ error : err });
		res.json({ msg : "Created a new category '" + createdCategory.name + "'" });
	});
});

// UPDATE route
routes.put("/:id", (req, res) => {
	Category.findByIdAndUpdate(req.params.id, { $set : req.body },
		(err, updatedCategory) => {
			if (err)
				res.json({ error : err });
			res.json({ msg: "Updated Category " + updatedCategory.name });
	});
});

// DELETE route
routes.delete("/:id", (req, res) => {
	Category.findByIdAndRemove(req.params.id, (err) => {
		if (err)
			res.json({ error : err });
		res.json({ msg : "Deleted Category Successfully" });
	});
});


module.exports = routes;
