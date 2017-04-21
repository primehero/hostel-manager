var mongoose = require("mongoose");

var tenantSchema = mongoose.Schema({
	name: String,
	adhaar: String,
	address: String,
	phone: String,
	room: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Room"
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



module.exports = mongoose.model("Tenant", tenantSchema);
