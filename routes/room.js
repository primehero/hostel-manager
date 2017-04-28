/**
 * ROOM ROUTES
 * ====
 */

var routes 				= require("express").Router();
var Room 					= require("../models/room");
var Hostel 				= require("../models/hostel");

// INDEX route
routes.get("/", (req, res) => {
	Room.find({}).populate('hostel').exec((err, foundRooms) => {
		if (err)
			res.json({error : err});
		res.json({rooms : foundRooms});
	});
});

// SHOW route
routes.get("/:id", (req, res) => {
	Room.findById(req.params.id)
		.populate('hostel')
		.exec((err, foundRoom) => {
			if (err)
				res.json({ error : err });
		res.json({ room : foundRoom });
	});
});

// CREATE route
routes.post("/", (req, res) => {
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
routes.put("/:id", (req, res) => {
	Room.findByIdAndUpdate(req.params.id,
			{ $set : req.body },
			(err, updatedRoom) => {
		if (err)
			res.json({ error : err });
		res.json({ msg : "Updated Room " + updatedRoom.roomNumber +
		 	" Successfully!" });
	});
});

// DELETE route
routes.delete("/:id", (req, res) => {
	Room.findByIdAndRemove(req.params.id, (err) => {
		if (err)
			res.json({ error : err });
		res.json({ msg : "Deleted Room Successfully" });
	});
});


module.exports = routes;
