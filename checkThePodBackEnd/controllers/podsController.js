const User = require("../models/Users");
const Pod = require("../models/Pods");
const asyncHandler = require("express-async-handler");
// @desc Get all pods
// @route GET /pods
// @access Private
//asyncHandler will take care what 'try catch' can
const getAllPods = asyncHandler(async (req, res) => {
  // Get all pods from MongoDB. if no methods will be used then use lean()
  const pods = await Pod.find().select("podName").lean();

  // If no pods
  if (!pods?.length) {
    return res.status(400).json({ message: "No pods found" });
  }

  res.json(pods);
});

// @desc Create new pod
// @route POST /pods
// @access Private
const createNewPod = asyncHandler(async (req, res) => {
  const {
    creatorId,
    podName,
    podFreeWeight,
    podTotalWeight,
    productRawAmount,
    usersOfThePod,
  } = req.body;

  // Confirm data
  if (!creatorId || !podName || !podFreeWeight) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate podName, if any parameter used with find documents suggest to use exec
  const duplicate = await Pod.findOne({ podName }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate podName" });
  }

  const podObject = {
    creatorId,
    podName,
    podFreeWeight,
    podTotalWeight: podTotalWeight ? podTotalWeight : 0,
    productRawAmount: productRawAmount ? productRawAmount : 0,
    usersOfThePod: [creatorId, ...usersOfThePod],
  };

  // Create and store new pod
  const pod = await Pod.create(podObject);

  if (pod) {
    //created
    res.status(201).json({ message: `New pod ${podName} created` });
  } else {
    res.status(400).json({ message: "Invalid pod data received" });
  }
});

// @desc Update a pod, creator cant be updated
// @route PATCH /pods
// @access Private
const updatePod = asyncHandler(async (req, res) => {
  const {
    id,
    creatorId,
    podName,
    podFreeWeight,
    podTotalWeight,
    productRawAmount,
    usersOfThePod,
  } = req.body;

  // Confirm data
  if (
    !podName ||
    !podFreeWeight ||
    !podTotalWeight ||
    !productRawAmount ||
    !usersOfThePod
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Does the pod exist to update?
  const pod = await Pod.findById(id).exec();

  if (!pod) {
    return res.status(400).json({ message: "Pod not found" });
  }

  // Check for duplicate
  const duplicate = await Pod.findOne({ podName }).lean().exec();

  // Allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate podName" });
  }

  pod.podName = podName;
  pod.podFreeWeight = podFreeWeight;
  pod.podTotalWeight = podTotalWeight;
  pod.productRawAmount = productRawAmount;
  pod.usersOfThePod = [creatorId, ...usersOfThePod];
  // user.active = active;

  const updatedPod = await pod.save();

  res.json({ message: `${updatedPod.podName} updated` });
});

// @desc Delete a pod
// @route DELETE /pods
// @access Private
const deletePod = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Pod ID Required" });
  }

  // Does the pod exist to delete?
  const pod = await Pod.findById(id).exec();

  if (!pod) {
    return res.status(400).json({ message: "Pod not found" });
  }

  const result = await pod.deleteOne();

  const reply = `Podname ${result.podname} with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllPods,
  createNewPod,
  updatePod,
  deletePod,
};
