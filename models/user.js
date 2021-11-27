const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Collection and Schema
var userSchema= new Schema({
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
   },
   address: {
        country: { type: String },
        city: { type: String },
        street: { type: String },
        phone: { type: Number }
   },
   paymentCards: [{
    cardNumber: { type: Number },
    fullName: { type: String },
    month: { type: Number },
    year: { type: Number },
    code: { type: Number }
    }]
}, {
   collection: 'users'
});
   
var User = mongoose.model('User', userSchema);
module.exports = { User };