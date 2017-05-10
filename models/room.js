var mongoose = require("mongoose");
var utils			= require('../krypton/functions');

mongoose.Promise = global.Promise;

roomSchema = mongoose.Schema({
	hostel: {
		type: 	mongoose.Schema.Types.ObjectId,
  	ref: 	"Hostel"
	},
	floor: String,
	roomNumber: String,
	numBeds: Number,
	numOccupied: {
		type: Number,
		default: 0
	},
	cost: Number,
	// All people living in will be stored
	_tenants: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Tenant"
	}],
	// Who should be able to access this hostel
	_creator: {
		_id: {
			type: 	mongoose.Schema.Types.ObjectId,
    	ref: 	"User"
		},
		_username: String
	},
	// Date
	_created: {
		type: Date,
		default: Date.now()
	}
});

/**
 * Gets all the rooms in connection to the given hostel mongooseId.
 * @param {mongoose.Schema.Types.ObjectId} mongooseId - Hostel mongooseId.
 * @returns {Promise} Resolves with found rooms.
 */
roomSchema.methods.getRelatedRooms = function(mongooseId) {
	// Change it to a mongoose id.
	mongooseId = mongoose.Types.ObjectId(mongooseId);
	return new Promise((resolve, reject) => {
		// now search all rooms
		this.model('Room').find({})
			.where('hostel').equals(mongooseId)
			.exec((err, foundRooms) => {
				if (err)
					reject(err);
				resolve(foundRooms);
			});
	});
};

// Filters by creator id
roomSchema.query.byCreator = utils.byCreator;
// Static for searching by id and checking owner.
roomSchema.query.checkOwner = utils.checkOwner;

// METHODS
// ====
// FINDBYID
roomSchema.statics.rjFindById =
	utils.rjFindById;
// UPDATE
roomSchema.statics.rjFindByIdAndUpdate =
	utils.rjFindByIdAndUpdate;
// REMOVE
roomSchema.statics.rjFindByIdAndRemove =
	utils.rjFindByIdAndRemove;

module.exports = mongoose.model("Room", roomSchema);
