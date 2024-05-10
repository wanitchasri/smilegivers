// File: ./models/products.js

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: String,
  neededAmount: Number
});

//Export function to create "ItemSchema" model class
module.exports = mongoose.model('Item', ItemSchema );