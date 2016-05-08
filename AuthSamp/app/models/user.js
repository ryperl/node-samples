var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// setup a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({
    name: String,
    password: String,
    admin: Boolean
}));