//Require Mongoose
var mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;

var DonationSchema = new Schema({
  code: Number,
  itemName: String,
  quantity: Number,
  donatorName: String,
  contactNo: String,
  donationStatus: String
});

//Export function to create "DonationSchema" model class
module.exports = mongoose.model("Donation", DonationSchema);
