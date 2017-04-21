var routes 			= require("express").Router();
var Hostel 			= require("../models/hostel");
var Category 		= require("../models/category");
var User	 			= require("../models/user");
var krypton   	= require("../functions/krypton");
var middleware  = require("../middleware");


// INDEX route
routes.get("/", middleware.isLoggedIn, (req, res) => {
	if (req.user.admin === false) {
		krypton.findMyHostels(req.user)
		.then(foundHostels => {
			res.render("hostel/index", { hostels : foundHostels });
		})
		.catch(err => {
			throw err;
		});
	} else {
		Hostel.find({}, (err, foundHostels) => {
			if (err)
				throw err;
			res.render("hostel/index", { hostels : foundHostels });
		});
	}
});

// NEW route
routes.get("/new", middleware.isAdmin, (req, res) => {
	// Get all the categories and push in.
	Category.find({}, (err, foundCategories) => {
		if (err) {
			req.flash('error', err);
			res.redirect('/hostel')
		}
		User.find({}, (err, foundUsers) => {
			res.render("hostel/new", {
				categories : foundCategories,
				users : foundUsers
			});
		});
	});
});

// CREATE route
/*
{ name: 'Some Hostel',
  category: '58e3dfaee511ff2fb75a609e',
  address: 'dddi',
  phone: '088676665',
  warden: { name: 'ddhwv', address: 'dhvdvyv', phone: '09089897998' },
  owner: '58e3d01e77186820edeb77f2',
  submit: 'submit' }
	// From Model
	_creator: {
		_id: {
			type: 	mongoose.Schema.Types.ObjectId,
    	ref: 	"User"
		},
		_username: String
	}
*/
routes.post("/", middleware.isAdmin, (req, res) => {
	// Category needs to be object id.
	req.body.category = mongoose.Types.ObjectId(req.body.category);
	// Find owner's details based on id
	User.findById(req.body.owner, (err, foundUser) => {
		if (err) {
			req.flash("error", err);
			res.redirect("/hostel");
		}
		req.body._creator 					= {};
		req.body._creator._id 			= foundUser._id;
		req.body._creator._username = foundUser.username;
		// Create a hostel
		Hostel.create(req.body, (err, createdHostel) => {
			if (err)
				req.flash('error', err);
			else
				req.flash('success', "Created a new Hostel " + createdHostel.name);
			console.log(JSON.stringify(createdHostel));
			res.redirect("/hostel");
		});
	});
});

// SHOW route
routes.get('/:id', middleware.isLoggedIn, (req, res) => {
	Hostel.findById(req.params.id)
		.populate('category')
		.populate('_creator._id')
		.exec((err, foundHostel) => {
		if (err) {
			req.flash('error', err);
			res.redirect('/hostel');
		}
		res.render('hostel/show', { hostel : foundHostel });
	});
});

// EDIT route
routes.get("/:id/edit", middleware.isAdmin, (req, res) => {
	Category.find({}, (err, foundCategories) => {
		if (err) {
			req.flash('error', err);
			res.redirect('/hostel')
		}
		User.find({}, (err, foundUsers) => {
			if (err) {
				req.flash('error', err);
				res.redirect('/hostel')
			}
			Hostel.findById(req.params.id, (err, foundHostel) => {
				if (err) {
					req.flash('error', err);
					res.redirect('/hostel')
				}
				res.render("hostel/edit",
				{
					categories : foundCategories,
					users : foundUsers,
					hostel : foundHostel
				});
			});
		});
	});
});

// UPDATE route
routes.put("/:id", middleware.isAdmin, (req, res) => {
	// Category needs to be object id.
	req.body.category = mongoose.Types.ObjectId(req.body.category);
	// Find owner's details based on id
	User.findById(req.body.owner, (err, foundUser) => {
		if (err) {
			req.flash("error", err);
			res.redirect("/hostel");
		}
		req.body._creator 					= {};
		req.body._creator._id 			= foundUser._id;
		req.body._creator._username = foundUser.username;
		Hostel.findByIdAndUpdate(req.params.id,
			{ $set : req.body },
			(err, updatedHostel) => {
			if (err) {
				req.flash("error", err);
				res.redirect("/hostel");
			}
			req.flash("success", "Updated hostel " + updatedHostel.name + " Successfully!");
			res.redirect("/hostel");
		});
	});
});

// DELETE route
routes.delete("/:id", middleware.isAdmin, (req, res) => {
	Hostel.findByIdAndRemove(req.params.id, (err) => {
		if (err) {
			req.flash("error", err);
			res.redirect("/hostel");
		}
		req.flash("success", "Successfully deleted a hostel!");
		res.redirect("/hostel");
	});
});



module.exports = routes;
