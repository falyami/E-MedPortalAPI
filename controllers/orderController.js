const express = require('express');
var router = express.Router();
var { Order } = require('../models/order');
var ObjectId = require('mongoose').Types.ObjectId;

// => localhost:4300/orders/:username
router.get('/:username', (req, res) => {
    Order.find({username: req.params.username})
    .then(docs =>  { res.send(docs); })
    .catch(err => { console.log('Error in Retrieving Orders: ' + JSON.stringify(err, undefined, 2)); });
});

// => localhost:4300/orders/:id
router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(404).send(`No Record Found with Given Id: ${req.params.id}`);
    Order.findById(req.params.id)
    .then(doc =>  { res.send(doc); })
    .catch(err => { console.log('Error in Retrieving Order: ' + JSON.stringify(err, undefined, 2)); });
});

// => localhost:4300/orders/user/:id
router.get('/user/:id', (req, res) => {
    if(!req.params.id)
        return res.status(404).send(`No Record Found with Given Username: ${req.params.id}`);
    Order.findById(req.params.id)
    .then(doc =>  { res.send(doc); })
    .catch(err => { console.log('Error in Retrieving Order: ' + JSON.stringify(err, undefined, 2)); });
});

// => localhost:4300/orders
router.post('/', (req, res) => {
    let order = new Order({
        orderNo: req.body.orderNo,
        username: req.body.username,
        fullName: req.body.fullName,
        totalPrice: req.body.totalPrice,
        status: req.body.status,
        paymentMethod: req.body.paymentMethod,
        paymentCard: req.body.paymentCard,
        orderDetails: req.body.orderDetails
    });

    order.save()
    .then(doc =>  { res.send(doc); })
    .catch(err => { console.log('Error in Saving Order: ' + JSON.stringify(err, undefined, 2)); res.send(false);});
});

// => localhost:4300/orders/:id
router.put('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(404).send(`No Record Found with Given Id: ${req.params.id}`);
    Order.findByIdAndUpdate({_id: req.params.id}, {
        totalPrice: req.body.totalPrice,
        status: req.body.status,
        paymentMethod: req.body.paymentMethod,
        paymentCard: req.body.paymentCard,
        orderDetails: req.body.orderDetails
    }, { runValidators: true, useFindAndModify: false, new: true })
    .then(doc => { res.send(doc); })
    .catch(err => { console.log('Error in Updating Order: ' + JSON.stringify(err, undefined, 2)); res.send(null);});
});

module.exports = router;