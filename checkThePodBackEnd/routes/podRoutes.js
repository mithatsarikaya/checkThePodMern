const express = require("express");
const router = express.Router();
const podsController = require("../controllers/podsController");
const { verifyJwt } = require("../middleware/verifyJwt");

router
  .route("/")
  .get(verifyJwt, podsController.getAllPods)
  .post(podsController.createNewPod)
  .patch(podsController.updatePod)
  .delete(podsController.deletePod);

router.route("/personalPods").get(verifyJwt, podsController.getPersonalPods);

module.exports = router;
