const express = require("express");
const router = express.Router();
const podsController = require("../controllers/podsController");
const { verifyJwt } = require("../middleware/verifyJwt");

router
  .route("/")
  .get(podsController.getAllPods)
  .post(verifyJwt, podsController.createNewPod)
  .patch(verifyJwt, podsController.updatePod)
  .delete(verifyJwt, podsController.deletePod);

router.route("/personalPods").get(verifyJwt, podsController.getPersonalPods);
router.route("/getThePod/:podId").get(verifyJwt, podsController.getThePod);
router.route("/getThePod/:podId").patch(verifyJwt, podsController.resetThePod);

module.exports = router;
