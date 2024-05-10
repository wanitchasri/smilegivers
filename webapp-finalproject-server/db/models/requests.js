//Require Mongoose
var mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;

var RequestSchema = new Schema({
  type: String,
  requestorName: String,
  donationCode: String,
  detail: String,
  requestStatus: String
});

//Export function to create "RequestSchema" model class
module.exports = mongoose.model("Request", RequestSchema);
