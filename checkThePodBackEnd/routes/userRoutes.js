const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const { verifyJwt } = require("../middleware/verifyJwt");

router
  .route("/")
  .get(verifyJwt, usersController.getAllUsers)
  .post(usersController.createNewUser)
  .patch(verifyJwt, usersController.updateUser)
  .delete(verifyJwt, usersController.deleteUser);

module.exports = router;
