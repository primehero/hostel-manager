var mongoose = require("mongoose");

var hostelSchema =
mongoose.Schema({
	name: String,
	description: String,
	category: {
		type: 	mongoose.Schema.Types.ObjectId,
        ref: 	"Category"
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

module.exports = mongoose.model("Hostel", hostelSchema);
