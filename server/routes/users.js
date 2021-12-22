var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

//localhost:3000/users/saveUser
router.post("/saveUser", userController.saveUser);

//localhost:3000/users/login
router.post("/login", userController.login);

module.exports = router;
