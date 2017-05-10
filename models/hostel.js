var mongoose 	= require("mongoose");
var utils			= require('../krypton/functions');

mongoose.Promise = global.Promise;

var hostelSchema =
mongoose.Schema({
	name: String,
	description: String,
	category: {
		type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
	},
	address: String,
	phone: String,
	warden: {
		name: String,
		address: String,
		phone: String
	},
	// Who should be able to access this hostel
	_creator: {
		_id: {
			type: mongoose.Schema.Types.ObjectId,
    	ref: "User"
		},
		_username: String
	},
	// Date
	_created: {
		type: Date,
		default: Date.now()
	}
});

// Filters by creator id
hostelSchema.query.byCreator = utils.byCreator;
// Static for searching by id and checking owner.
hostelSchema.query.checkOwner = utils.checkOwner;


// METHODS
// ====
// FINDBYID
hostelSchema.statics.rjFindById =
	utils.rjFindById;
// UPDATE
hostelSchema.statics.rjFindByIdAndUpdate =
	utils.rjFindByIdAndUpdate;
// REMOVE
hostelSchema.statics.rjFindByIdAndRemove =
	utils.rjFindByIdAndRemove;



module.exports = mongoose.model("Hostel", hostelSchema);
