var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
mongoose.Promise = global.Promise;

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    admin: {
    	type: Boolean,
    	default: false
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
