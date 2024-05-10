var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var Request = require("../db/models/requests");

/* GET requests listing. */
router.get("/", (req, res, next) => {
  Request.find({}, (err, result) => {
    if (err) {
      console.debug("Hey Look! Error", err);
      res.json(err);
    } else {
      // console.log(res);
      res.json(result);
    }
  });
});



// Create new request
router.post("/", (req, res, next) => {
  console.debug(req.body);
  const data = req.body;
  const newRequest = new Request({
    type: data.type,
    requestorName: data.requestorName,
    donationCode: data.donationCode,
    detail: data.detail,
    requestStatus: data.requestStatus
  });
  
  newRequest.save((err, newInstance) => {
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
  console.debug('Request ID to delete',id);

  Request.findByIdAndDelete(id, (err, doc) => {
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
  var Request1 = await Request.findOne({ _id: data._id });
    Request1.type = data.type,
    Request1.requestorName = data.requestorName,
    Request1.donationCode = data.donationCode,
    Request1.detail = data.detail,
    Request1.requestStatus = data.requestStatus

  await Request1.save();
  res.status(200).json(Request1);
});

module.exports = router;

