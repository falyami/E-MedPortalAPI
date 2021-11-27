const express = require('express');
var router = express.Router();
var { Category } = require('../models/category');
var ObjectId = require('mongoose').Types.ObjectId;

// => localhost:4300/categories
router.get('/', (req, res) => {
    Category.find({})
    .then(docs =>  { res.send(docs); })
    .catch(err => { console.log('Error in Retrieving Categories: ' + JSON.stringify(err, undefined, 2)); });
});

// => localhost:4300/categories/categorybyid/:id
router.get('/categorybyid/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(404).send(`No Record Found with Given Id: ${req.params.id}`);
    Category.findById(req.params.id)
    .then(doc =>  { res.send(doc); })
    .catch(err => { console.log('Error in Retrieving Category: ' + JSON.stringify(err, undefined, 2)); });
});

module.exports = router;