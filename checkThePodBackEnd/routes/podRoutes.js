const express = require("express");
const router = express.Router();
const podsController = require("../controllers/podsController");
const { verifyJwt } = require("../middleware/verifyJwt");

router
  .route("/")
  .get(podsController.getAllPods)
  .post(verifyJwt, podsController.createNewPod)
  .patch(podsController.updatePod)
  .delete(verifyJwt, podsController.deletePod);

router.route("/personalPods").get(verifyJwt, podsController.getPersonalPods);
router.route("/getThePod/:podId").get(verifyJwt, podsController.getThePod);

module.exports = router;
