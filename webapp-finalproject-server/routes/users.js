var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/login", (req, res, next) => {
  const predefinedUsers = [
    {
      email: "admin@hotmail.com",
      password: "adminishere",
      username: "admin",
      phone: "099999999",
      admin: true
    },
    { 
      email: "donator@hotmail.com",
      password: "donatorishere",
      username: "donator",
      phone: "0888888888",
      admin: false
    },
  ];

  const data = req.body;
  const foundUser = predefinedUsers.find(
    (u) => u.email === data.email && u.password === data.password
  );
  
  // console.log("user's data", data);
  // console.log(foundUser);

  if (foundUser) {
    delete foundUser.password;
    res.send(foundUser);
  } else {
    res.send({
      error: "user not found",
    });
  }
});

module.exports = router;
