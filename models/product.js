const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Collection and Schema
var productSchema= new Schema({
   categoryId: {
      type: String
   },
   name: {
      type: String
   },
   img: {
      type: String
   },
   alt: {
      type: String
   },
   description: {
       type: String
   },
   quantity: {
       type: Number
   },
   price: {
    type: Number
   },
   size: {
    type: String
   },
   status: {
      type: Number,
      default: 0
   }
}, {
   collection: 'products'
});
   
var Product = mongoose.model('Product', productSchema);
module.exports = { Product };