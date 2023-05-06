const express = require("express");
const router = express.Router();
const podsController = require("../controllers/podsController");

router
  .route("/")
  .get(podsController.getAllPods)
  .post(podsController.createNewPod)
  .patch(podsController.updatePod)
  .delete(podsController.deletePod);

router.route("/personalPods").get(podsController.getPersonalPods);

module.exports = router;
