var mongoose = require("mongoose");

var paymentSchema =
mongoose.Schema({
	title: String,
	amount: Number,
	description: String,
	tenant: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Tenant'
	},
	desc: String,
	nextDate: {
		type: Date,
		default: Date.now()
	},
	// Who should be able to access this hostel
	_creator: {
		_id: {
			type: 	mongoose.Schema.Types.ObjectId,
    	ref: 	'User'
		},
		_username: String
	},
	_createdOn: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model("Payment", paymentSchema);
