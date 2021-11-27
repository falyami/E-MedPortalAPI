const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Collection and Schema
var wishListSchema= new Schema({
    categoryId: {
        type: String
    },
    productId: {
        type: String
    },
    img: {
        type: String
    },
    name: {
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
    username: {
        type: String
    },
    status: {
        type: Number,
        default: 0
    }
}, {
   collection: 'wishLists'
});
   
var WishList = mongoose.model('WishList', wishListSchema);
module.exports = { WishList };