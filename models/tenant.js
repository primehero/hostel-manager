var mongoose = require("mongoose");
var utils			= require('../krypton/functions');

mongoose.Promise = global.Promise;

var tenantSchema = mongoose.Schema({
	name: String,
	adhaar: String,
	address: String,
	phone: String,
	room: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Room"
	},
	hostel: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Hostel"
	},
	payments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "Payment"
	}],
	amenities: [String],
	startDate: {
		type: Date,
		default: Date.now()
	},
	endDate: {
		type: Date,
		default: Date.now()
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


/**
 * Adds a paymentId on the Tenant.
 * @param {mongoose.Schema.Types.ObjectId} mongooseId - MongooseId of tenant.
 * @param {mongoose.Schema.Types.ObjectId} paymentId - MongooseId of payment of this user.
 * @returns {Promise}
 */
tenantSchema.methods.addPayment = function(mongooseId, paymentId) {
	if (!roomId || !paymentId)
		throw new Error("roomId / paymentId is empty.");

	return new Promise(function(resolve, reject) {
		// Find by id
		this.model('Tenant').findById(mongooseId, (err, foundTenant) => {
			foundTenant.payments.push(paymentId);
			foundTenant.save(err => {
				if (err)
					reject(err);
				resolve(foundTenant);
			});
		});
	});
};

// Filters by creator id
tenantSchema.query.byCreator = utils.byCreator;
// Static for searching by id and checking owner.
tenantSchema.query.checkOwner = utils.checkOwner;

// METHODS
// ====
// FINDBYID
tenantSchema.statics.rjFindById =
	utils.rjFindById;
// UPDATE
tenantSchema.statics.rjFindByIdAndUpdate =
	utils.rjFindByIdAndUpdate;
// REMOVE
tenantSchema.statics.rjFindByIdAndRemove =
	utils.rjFindByIdAndRemove;


module.exports = mongoose.model("Tenant", tenantSchema);
