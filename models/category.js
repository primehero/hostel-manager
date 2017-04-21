/**
 * CATEGORY MONGOOSE MODEL
 */

var mongoose = require("mongoose");

var categorySchema =
mongoose.Schema({
	name: String,
	// Who should be able to access this category.
	_creator: {
		_id: {
			type: 	mongoose.Schema.Types.ObjectId,
    	ref: 	"User"
		},
		_username: String
	}
});

module.exports = mongoose.model("Category", categorySchema);
