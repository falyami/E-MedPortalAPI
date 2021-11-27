const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Collection and Schema
var categorySchema= new Schema({
   title: {
      type: String,
      unique: true
   },
   img: {
      type: String
   },
   alt: {
      type: String
   },
   description: {
       type: String
   }
}, {
   collection: 'categories'
});
   
var Category = mongoose.model('Category', categorySchema);
module.exports = { Category };