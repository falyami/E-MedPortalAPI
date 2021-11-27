const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Collection and Schema
var adminSchema= new Schema({
   fullName: {
      type: String
   },
   username: {
      type: String,
      unique: true
   },
   email: {
      type: String,
      unique: true
   },
   password: {
       type: String
   },
   status: {
       type: Boolean,
       default: false
   }
}, {
   collection: 'administrators'
});
   
var Admin = mongoose.model('Admin', adminSchema);
module.exports = { Admin };