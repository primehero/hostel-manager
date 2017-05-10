var mongoose = require("mongoose");
var utils			= require('../krypton/functions');

mongoose.Promise = global.Promise;

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

// Filters by creator id
paymentSchema.query.byCreator = utils.byCreator;
// Static for searching by id and checking owner.
paymentSchema.query.checkOwner = utils.checkOwner;

// METHODS
// ====
// FINDBYID
paymentSchema.statics.rjFindById =
	utils.rjFindById;
// UPDATE
paymentSchema.statics.rjFindByIdAndUpdate =
	utils.rjFindByIdAndUpdate;
// REMOVE
paymentSchema.statics.rjFindByIdAndRemove =
	utils.rjFindByIdAndRemove;


module.exports = mongoose.model("Payment", paymentSchema);
