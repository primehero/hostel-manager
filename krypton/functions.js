var mongoose = require("mongoose");

/**
 * Returns the objects owned by a USER or all Objects in case
 * of an ADMIN.
 * @param {String} user - The Current User.
 * @return {Object} 		- List of all objects owned by the user.
 */
exports.byCreator = function(user) {
	if (user.admin)
		return this;
	return this.find({ '_creator._id' : user._id });
};

/**
 * Checks if the user owns this particular object. Do not use with
 * queries that returns lists.
 * @param {Object} user - user object of the current user.
 */
exports.checkOwner = function(user) {
	if (user.admin)
		return this;
	return this.find({ '_creator._id' : user._id });
};

/**
 * Finds an object by id verifying the ownership of the object
 * by user.
 * @param {String} id - mongoose ObjectId of object to find.
 * @param {String} populates - Populations to be done.
 * @param {String} user - Current User to check ownership.
 * @param {Object} res - Response object from express router.
 */
exports.rjFindById = function(id, populates, user, res) {
	this.find({ _id : mongoose.Types.ObjectId(id) })
		.populate(populates)
		.checkOwner(user)
		.exec((err, foundResults) => {
			if (err)
				res.json({ error : err });
			else if (foundResults.length < 1)
				res.json({ error : "No such object!" });
			else {
				res.json({ result : foundResults[0] });
			}
	});
};

exports.rjCreate = function(user, req) {
}

/**
 * Updates a given object if the user is the owner or admin
 * @param {String} id - ObjectId of the object to update.
 * @param {Object} user - Current user to compare as object owner.
 * @param {Object} res - Response object from express router.
 * @param {Object} body - The new data update object to.
 */
exports.rjFindByIdAndUpdate = function(id, user, res, body) {
	this.find({ _id : mongoose.Types.ObjectId(id) })
		.checkOwner(user)
		.exec((err, foundResults) => {
			if (err) {
				res.json({ error : err });
			}	else if (foundResults.length < 1) {
				res.json({ err : "No such object!" });
			}	else {
				this.update(
					foundResults[0], body, { upsert : true },
					function(err) {
						if (err)
							res.json({ error : err });
						else
							res.json({ msg : "Updated successFully!"	});
				}); // update
			} // else
	});
};

/**
	* Removes a given object if the user is the owner or admin
	* @param {String} id - ObjectId of the object to update.
	* @param {Object} user - Current user to compare as object owner.
	* @param {Object} res - Response object from express router.
 */
exports.rjFindByIdAndRemove = function(id, user, res) {
	this.find({ _id : mongoose.Types.ObjectId(id) })
		.checkOwner(user)
		.exec((err, foundResults) => {
			if (err) {
				res.json({ error : err });
			}	else if (foundResults.length < 1) {
				res.json({ err : "No such object!" });
			}	else {
				// Remove first result.
				foundResults[0].remove(function(err) {
					if (err)
						res.json({ error : err });
					else
						res.json({ msg : "Removed SuccessFully!"	});
				});
			} // else
	});
}
