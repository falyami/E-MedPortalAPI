const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Collection and Schema
var orderSchema= new Schema({
   orderNo: {
      type: String
   },
   username: {
      type: String
   },
   fullName: {
    type: String
   },
   totalPrice: {
      type: Number
   },
   orderDate: {
      type: Date,
      default: Date.now()
   },
   status: {
      type: String
   },
   paymentMethod: {
      type: String
   },
   paymentCard: {
      type: String
   },
   orderDetails: [{ 
      productId: {
         type: String
      },
      productName: {
         type: String
      },
      quantity: {
         type: Number
      },
      size: {
         type: String
      },
      price: {
          type: Number
      },
      status: {
         type: Boolean
      }
   }]
}, {
   collection: 'orders'
});
   
var Order = mongoose.model('Order', orderSchema);
module.exports = { Order };