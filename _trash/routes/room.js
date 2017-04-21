var routes 			= require("express").Router();
var Room 				= require("../models/room");
var Hostel 			= require("../models/hostel");
var middleware 	= require("../middleware");

// Most of the routes in rooms need authentication.
// All of the methods absolutely need req.params.hostel

// INDEX route
routes.get("/", middleware.isLoggedIn, (req, res) => {
	if (!req.query.hostel) {
		req.flash("error", "Error finding room!");
		res.redirect("/hostel");
	}
	let newRoomObject = new Room();
	newRoomObject.getRelatedRooms(req.query.hostel)
		.then((foundRooms) => {
			res.render("room/index", { rooms : foundRooms });
		})
		.catch((err) => {
			req.flash("error", JSON.stringify(err));
			res.redirect("/hostel/" + req.query.hostel);
		});
});

// NEW route
routes.get("/new", middleware.isLoggedIn, (req, res) => {
	res.render("room/new", { hostelId : req.query.hostel });
});

// CREATE route
routes.post("/", middleware.isLoggedIn, (req, res) => {
	Room.create(req.body, (err, createdRoom) => {
		if (err) {
			req.flash("error", err);
			res.redirect("/hostel");
		} else {
			Hostel.findById(createdRoom.hostel, (err, foundHostel) => {
				if (err) {
					req.flash("error", err);
					res.redirect("/hostel");
				} else {
					console.log(createdRoom);
					createdRoom._creator = foundHostel._creator;
					createdRoom.save(err => {
						if (err) {
							req.flash("error", err);
							res.redirect("/hostel");
						}
						else {
							req.flash(
								"success",
								"Created a new room, room number " + createdRoom.roomNumber);
							res.redirect("/room?hostel=" + createdRoom.hostel);
						}
					});
				}
			});
		}
	});
});


// SHOW route
routes.get("/:id", middleware.isLoggedIn, (req, res) => {
	Room.findById(req.params.id).populate('hostel').exec((err, foundRoom) => {
		if (err) {
			req.flash("error", err);
			res.redirect("/hostel")
		}
		res.render('room/show', { room : foundRoom });
	});
});

// EDIT route
routes.get("/:id/edit", middleware.isLoggedIn, (req, res) => {
	Room.findById(req.params.id).exec((err, foundRoom) => {
		if (err) {
			req.flash("error", err);
			res.redirect("/hostel")
		}
		res.render('room/edit', { room : foundRoom });
	});
});

// UPDATE route
routes.put("/:id", middleware.isLoggedIn, (req, res) => {
	Room.findByIdAndUpdate(req.params.id,
			{ $set : req.body },
			(err, updatedRoom) => {
		if (err)
			req.flash("error", err);
		else
			req.flash("success", "Updated Room " + updatedRoom.roomNumber + " Successfully!");
		res.redirect("/room/" + req.params.id);
	});
});

// DELETE route
routes.delete("/:id", middleware.isLoggedIn, (req, res) => {
	Room.findByIdAndRemove(req.params.id, (err) => {
		if (err)
			req.flash('error', err);
		else
			req.flash('success', "Deleted Room Successfully");
		res.redirect("/hostel");
	});
});


module.exports = routes;
