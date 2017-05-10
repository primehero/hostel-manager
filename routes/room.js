/**
 * ROOM ROUTES
 * ====
 */

var routes 				= require("express").Router();
var Room 					= require("../models/room");
var Hostel 				= require("../models/hostel");
var middleware 		= require("../krypton/middleware");


// INDEX route
routes.get("/", middleware.isLoggedIn, (req, res) => {
	Room.find({})
		.byCreator(req.user)
		.populate('hostel')
		.exec((err, foundRooms) => {
		if (err)
			res.json({ error : err });
			res.json({rooms : foundRooms});
	});
});

// SHOW route
routes.get("/:id", middleware.isLoggedIn, (req, res) => {
	Room.rjFindById(
		req.params.id, 'hostel',
		req.user, res );
});

// CREATE route
routes.post("/", middleware.isLoggedIn, (req, res) => {
	Room.create(req.body, (err, createdRoom) => {
		if (err)
			res.json({ error : err });
		else {
			Hostel.findById(createdRoom.hostel, (err, foundHostel) => {
				if (err)
					res.json({ error : err });
				else {
					createdRoom._creator = foundHostel._creator;
					createdRoom.save(err => {
						if (err)
							res.json({ error : err });
						else
							res.json({ msg : "Created a new room, room number " + createdRoom.roomNumber });
					}); 		// ./save
				}					// ./else
			});					// ./findById
		}							// ./else
	});							// ./create
});								// ./post


// UPDATE route
routes.put("/:id", middleware.isLoggedIn, (req, res) => {
	Room.rjFindByIdAndUpdate(
		req.params.id, req.user,
		res, req.body );
});

// DELETE route
routes.delete("/:id", middleware.isLoggedIn, (req, res) => {
	Room.rjFindByIdAndRemove(
		req.params.id, req.user, res );
});


module.exports = routes;
