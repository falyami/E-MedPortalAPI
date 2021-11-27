const express = require('express');
var router = express.Router();
var { User } = require('../models/user');
var ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt');

// => localhost:4300/users
router.post('/', (req,res) => {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        if(err){
            console.log('Error While Password Encryption: ' + JSON.stringify(err, undefined, 2));
        } else {
            console.log(req.body);
            let user = new User ({
                fullName: req.body.fullName,
                username: req.body.username,
                email: req.body.email,
                password: hash,
                status: true,
                address: req.body.address,
                paymentCards: req.body.paymentCards
            });

            user.save()
            .then(doc => { res.send(true); })
            .catch(err => { res.send(false); console.log('Error in Posting User: ' + JSON.stringify(err, undefined, 2)) });
        }
    });
});

// => localhost:4300/users/login
router.post('/login', (req,res) => {
    let username = req.body.username;
    User.find({username: username})
    .exec()
    .then(user => {
        if (user.length < 1) {
            console.log('Error in Authenticating User: ' + JSON.stringify(err, undefined, 2));
        } else {
            bcrypt.compare(req.body.password, user[0].password, function(err, doc) {
                if (err){
                    console.log('Error in Authenticating User: ' + JSON.stringify(err, undefined, 2));
                }
                if(doc) { res.send(true); } else { res.send(false); }
            });  
        }
    }).catch(err => { res.send(false); console.log('Error in User Login: ' + JSON.stringify(err, undefined, 2)); res.send(false); });
});

// => localhost:4300/users/:username
router.get('/:username', (req, res) => {
    User.findOne({username: req.params.username})
    .then(doc => { res.send(doc); })
    .catch(err => { console.log('Error in Retrieving User: ' + JSON.stringify(err, undefined, 2)); });
});

module.exports = router;