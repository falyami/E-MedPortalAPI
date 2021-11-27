const express = require('express');
var router = express.Router();
var { Product } = require('../models/product');
var { ShoppingCart } = require('../models/shoppingcart');
var { WishList } = require('../models/wishlist');
const fileUpload = require('express-fileupload');
var ObjectId = require('mongoose').Types.ObjectId;

// => localhost:4300/products
router.get('/', (req, res) => {
    Product.find({})
    .then(docs =>  { res.send(docs); })
    .catch(err => { console.log('Error in Retrieving Products: ' + JSON.stringify(err, undefined, 2)); });
});

// => localhost:4300/products
router.post('/', (req, res) => {
    let product = new Product ({
        categoryId: req.body.categoryId,
        name: req.body.name,
        img: req.body.img,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price,
        size: req.body.size,
        alt: req.body.alt,
        status: Number(req.body.status)
    });

    if (req.files) {
        let file = req.files.imgFile;
        let DIRPath = '../Backend/assets/images/' + file.name;
        file.mv(DIRPath, function(err) {
        if (err) {
            return res.send(false);
            } else {
                product.save()
                .then(doc => { res.send(true); })
                .catch(err => { console.log('Error in Posting Product: ' + JSON.stringify(err, undefined, 2)); res.send(false);});
            }
        });
    } else {
        res.send(false);
    }
});

// => localhost:4300/products/:id
router.put('/:id', (req, res) => {
    console.log(req.body._id);
    if(!ObjectId.isValid(req.params.id))
        return res.status(404).send(`No Record Found with Given Id: ${req.params.id}`);
    if (req.files) {
        let file = req.files.imgFile;
        let DIRPath = '../Backend/assets/images/' + file.name;
        file.mv(DIRPath, function(err) {
        if (err)
            return res.send(false);
        });
    }

    Product.findByIdAndUpdate({_id: req.params.id}, {name: req.body.name,
        categoryId: req.body.categoryId,
        description: req.body.description,
        price: req.body.price,
        size: req.body.size,
        img: req.body.img,
        alt: req.body.alt,
        quantity: req.body.quantity,
        status: Number(req.body.status)}, { runValidators: true, useFindAndModify: false, new: true })
    .then(doc => { res.send(true); })
    .catch(err => { console.log('Error in Updating Product: ' + JSON.stringify(err, undefined, 2)); res.send(false);}); 
});

// => localhost:4300/products/:id
router.get('/:id', (req, res) => {
    Product.find({}).where('categoryId').equals(req.params.id)
    .where('status').equals(1)
    .exec()
    .then(docs =>  { res.send(docs); })
    .catch(err => { console.log('Error in Retrieving Products: ' + JSON.stringify(err, undefined, 2)); });
});

// => localhost:4300/products/productbyid/:id
router.get('/productbyid/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(404).send(`No Record Found with Given Id: ${req.params.id}`);
    Product.findById(req.params.id)
    .then(doc =>  { res.send(doc); })
    .catch(err => { console.log('Error in Retrieving Product: ' + JSON.stringify(err, undefined, 2)); });
});

// => localhost:4300/products/shoppingcart
router.post('/shoppingcart', (req, res) => {
    let shoppingCart = new ShoppingCart ({
        categoryId: req.body.categoryId,
        productId: req.body.productId,
        name: req.body.name,
        img: req.body.img,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price,
        size: req.body.size,
        username: req.body.username,
        status: req.body.status
    });
    shoppingCart.save()
    .then(doc => { res.send(doc); })
    .catch(err => { console.log('Error in Posting Product: ' + JSON.stringify(err, undefined, 2)) });
});

// => localhost:4300/products/shoppingcart/:username
router.get('/shoppingcart/:username', (req, res) => {
    ShoppingCart.find({}).where('username').equals(req.params.username)
    .exec()
    .then(docs =>  { res.send(docs); })
    .catch(err => { console.log('Error in Retrieving Product: ' + JSON.stringify(err, undefined, 2)); });
});

// => localhost:4300/products/shoppingcart/:id
router.put('/shoppingcart/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(404).send(`No Record Found with Given Id: ${req.params.id}`);
    ShoppingCart.findByIdAndUpdate({_id: req.params.id}, {quantity: req.body.quantity}, { runValidators: true, useFindAndModify: false, new: true })
    .then(doc => { res.send(doc); })
    .catch(err => { console.log('Error in Updating Product: ' + JSON.stringify(err, undefined, 2)); });
});

// => localhost:4300/products/shoppingcart/:id
router.delete('/shoppingcart/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(404).send(`No Record Found with Given Id: ${req.params.id}`);
    ShoppingCart.findByIdAndRemove(req.params.id)
    .then(doc => { res.send(doc); })
    .catch(err => { console.log('Error in Deleting Product: ' + JSON.stringify(err, undefined, 2)); });
});

// => localhost:4300/products/wishList
router.post('/wishList', (req, res) => {
    let wishList = new WishList ({
        categoryId: req.body.categoryId,
        productId: req.body.productId,
        name: req.body.name,
        img: req.body.img,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price,
        size: req.body.size,
        username: req.body.username,
        status: req.body.status
    });
    wishList.save()
    .then(doc => { res.send(doc); })
    .catch(err => { console.log('Error in Posting Product: ' + JSON.stringify(err, undefined, 2)) });
});

// => localhost:4300/products/wishlist/:username
router.get('/wishlist/:username', (req, res) => {
    WishList.find({}).where('username').equals(req.params.username)
    .then(docs =>  { res.send(docs); })
    .catch(err => { console.log('Error in Retrieving Product: ' + JSON.stringify(err, undefined, 2)); });
});

// => localhost:4300/products/wishlist/:id
router.put('/wishlist/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(404).send(`No Record Found with Given Id: ${req.params.id}`);
    WishList.findByIdAndUpdate({_id: req.params.id}, {quantity: req.body.quantity}, { runValidators: true, useFindAndModify: false, new: true })
    .then(doc => { res.send(doc); })
    .catch(err => { console.log('Error in Updating Product: ' + JSON.stringify(err, undefined, 2)); });
});

// => localhost:4300/products/wishlist/:id
router.delete('/wishlist/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(404).send(`No Record Found with Given Id: ${req.params.id}`);
    WishList.findByIdAndRemove(req.params.id)
    .then(doc => { res.send(doc); })
    .catch(err => { console.log('Error in Deleting Product: ' + JSON.stringify(err, undefined, 2)); });
});

module.exports = router;