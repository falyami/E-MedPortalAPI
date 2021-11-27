const express = require('express');
var router = express.Router();
var { Admin } = require('../models/admin');
var ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt');

// => localhost:4300/admins
router.get('/', (req, res) => {
    Admin.find({})
    .where('username').ne('admin')
    .exec()
    .then(docs => { res.send(docs); } )
    .catch(err => { console.log('Error in Retrieving Admininstrators: ' + JSON.stringify(err, undefined, 2)); });
});

// => localhost:4300/admins/adminbyid/:id
router.get('/adminbyid/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(404).send(`No Record Found with Given Id: ${req.params.id}`);
    Admin.findById(req.params.id)
    .then(doc => { res.send(doc); })
    .catch(err => { console.log('Error in Retrieving Admininstrator: ' + JSON.stringify(err, undefined, 2)); });
});

// => localhost:4300/admins
router.post('/', (req, res) => {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        if(err){
            console.log('Error While Password Encryption: ' + JSON.stringify(err, undefined, 2));
        } else {
            let admin = new Admin ({
                fullName: req.body.fullName,
                username: req.body.username,
                email: req.body.email,
                password: hash,
                status: req.body.status
            });
            admin.save()
            .then(doc => { res.send(true); })
            .catch(err => { res.send(false); console.log('Error in Posting Admininstrator: ' + JSON.stringify(err, undefined, 2)) });
        }
    });
});

// => localhost:4300/admins/:id
router.put('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(404).send(`No Record Found with Given Id: ${req.params.id}`);
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        if(err){
            console.log('Error While Password Encryption: ' + JSON.stringify(err, undefined, 2));
        } else {
            Admin.findByIdAndUpdate({_id: req.params.id}, {fullName: req.body.fullName,
                username: req.body.username,
                email: req.body.email,
                password: hash,
                status: req.body.status}, { runValidators: true, useFindAndModify: false, new: true })
                .then(doc => { res.send(true); })
                .catch(err => { console.log('Error in Updating Admininstrator: ' + JSON.stringify(err, undefined, 2)); res.send(false); });
        }
    });
});

// => localhost:4300/admins/:id
router.delete('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(404).send(`No Record Found with Given Id: ${req.params.id}`);
    Admin.findByIdAndRemove(req.params.id)
    .then(doc => { res.send(doc); })
    .catch(err => { console.log('Error in Deleting Admininstrator: ' + JSON.stringify(err, undefined, 2)); });
});

// => localhost:4300/admins/login
router.post('/login', (req,res) => {
    let username = req.body.username;
    Admin.find({username: username})
    .exec()
    .then(admin => {
        if (admin.length < 1) {
            console.log('Error in Authenticating Administrator: ' + JSON.stringify(err, undefined, 2));
        } else {
            bcrypt.compare(req.body.password, admin[0].password, function(err, doc) {
                if (err){
                    console.log('Error in Authenticating Administrator: ' + JSON.stringify(err, undefined, 2));
                }
                if(doc) { res.send(true); } else { res.send(false); }
            });  
        }
    }).catch(err => { console.log('Error in Administrator Login: ' + JSON.stringify(err, undefined, 2)); res.send(false); });
});

module.exports = router;