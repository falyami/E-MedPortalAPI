const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const { mongoose } = require('./db.js');
const fileUpload = require('express-fileupload');

var categoryController = require('./controllers/catergoryController.js');
var productController = require('./controllers/productController.js');
var orderController = require('./controllers/orderController.js');
var adminController = require('./controllers/adminController.js');
var userController = require('./controllers/userController.js');

var app = express();
app.use('/img', express.static(path.join(__dirname,'assets/images')));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:4200'
}));
app.use(fileUpload({
    createParentPath: true
}));

app.listen(4300, () => console.log('Server Started at Port: 4300'));

app.use('/categories', categoryController);
app.use('/products', productController);
app.use('/orders', orderController);
app.use('/admins', adminController);
app.use('/users', userController);