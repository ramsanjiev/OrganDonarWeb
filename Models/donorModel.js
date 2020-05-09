var mongoose = require('mongoose');

var donorSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    Address: String,
    Address1: String,
    City: String,
    State: String,
    Zip: Number,
    Contact: Number,
    Organs: [{
        type: String
    }],
    NomName: String,
    NomRel: String,
    NomCon: Number,
    NomCity: String,
});

var donator = mongoose.model('donator', donorSchema);

module.exports = donator;