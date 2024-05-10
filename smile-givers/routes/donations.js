var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var Donation = require("../db/models/donations");

/* GET donations listing. */
router.get("/", (req, res, next) => {
  Donation.find({}, (err, result) => {
    if (err) {
      console.debug("Hey Look! Error", err);
      res.json(err);
    } else {
      // console.log(res);
      res.json(result);
    }
  });
});



// Create new donation
router.post("/", (req, res, next) => {
  console.debug(req.body);
  const data = req.body;
  const newDonation = new Donation({
    code: data.code,
    itemName: data.itemName,
    quantity: data.quantity,
    donatorName: data.donatorName,
    contactNo: data.contactNo,
    donationStatus: data.donationStatus
  });
  
  newDonation.save((err, newInstance) => {
    if (err) {
      console.error("Hey look, Error!", err);
      res.json(err);
    } else {
      res.json(newInstance);
    }
  });
});

router.delete("/:id", (req, res, next) => {
  // console.log(req.body)
  // const id = req.body._id;
  const id = req.params['id'] // use ID from the route parameter
  // res.status(200).json(req.params)

  console.log("Delete this id", id)
  console.debug('Donation ID to delete',id);

  Donation.findByIdAndDelete(id, (err, doc) => {
    if (err) {
      console.error("Hey look, Error!", err);
      res.json(err);
    } else {
      res.status(200).json(doc);
    }
  });
});

router.put("/", async (req, res, next) => {
  console.debug(req.body);
  const data = req.body;
  var donation1 = await Donation.findOne({ _id: data._id });
  donation1.code = data.code;
  donation1.itemName = data.itemName;
  donation1.quantity = data.quantity;
  donation1.donatorName = data.donatorName;
  donation1.contactNo = data.contactNo;
  donation1.donationStatus = data.donationStatus;

  await donation1.save();
  res.status(200).json(donation1);
});

module.exports = router;

