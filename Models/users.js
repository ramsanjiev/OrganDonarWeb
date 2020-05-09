var mongoose = require('mongoose');
var passportLocal = require('passport-local-mongoose');
//Set up default mongoose connection

var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    donors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'donator'
    }]
});

UserSchema.plugin(passportLocal);
// Compile model from schema
var UserModel = mongoose.model('UserModel', UserSchema);
module.exports = UserModel;