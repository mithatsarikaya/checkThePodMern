const User = require("../models/Users");
const Pod = require("../models/Pods");
const asyncHandler = require("express-async-handler");

const getIdsFromNameList = async (usersOfThePod) => {
  // //convert list of usernames to list of their id's
  const idOfTheUsersOfThePod = [];

  for (let i = 0; i < usersOfThePod.length; i++) {
    const username = usersOfThePod[i];
    let foundUserFromCreatedPod = await User.findOne({ username });
    idOfTheUsersOfThePod.push(foundUserFromCreatedPod._id);
  }

  return idOfTheUsersOfThePod;
};

// @desc Get all pods
// @route GET /pods
// @access public
//asyncHandler will take care what 'try catch' can
//adding
const getAllPods = asyncHandler(async (req, res) => {
  // Get all pods from MongoDB. if no methods will be used then use lean()
  const pods = await Pod.find()
    .populate("creatorId", "username")
    .sort({ updatedAt: -1 })
    .lean();

  // If no pods
  if (!pods?.length) {
    return res.status(400).json({ message: "No pods found" });
  }

  res.json(pods);
});
// @desc Get all pods
// @route GET /pods/getThePod/:podId
// @access private
const getThePod = asyncHandler(async (req, res) => {
  // Get all pods from MongoDB. if no methods will be used then use lean()
  let podId = req.params.podId;
  const pod = await Pod.findById(podId)
    .populate("usersOfThePod", "username")
    .lean();

  console.log({ pod });

  return res.json(pod);
  // If no pod
  if (!pod?.length) {
    return res.status(400).json({ message: "No pod found" });
  }

  res.json(pod);
});

// @desc Get all pods
// @route GET /pods/personalPods
// @access Private
const getPersonalPods = asyncHandler(async (req, res) => {
  //getting from verifyJwt middleware
  const userId = req.userId;
  const pods = await Pod.find({ usersOfThePod: userId })
    .populate("usersOfThePod", "username")
    .sort({ updatedAt: -1 })
    .lean();

  // return console.log(pods[0].usersOfThePod);
  return res.status(201).json(pods);
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
  console.log(req.body);

  let userId = req.userId;

  if (!creatorId || !podName || !podFreeWeight) {
    // Confirm data
    return res
      .status(400)
      .json({ message: "Pod Name and Pod Tare are required." });
  }
  if (creatorId !== userId) {
    return res.status(400).json({ message: "creatorid and userid not equal" });
  }

  // Check for duplicate podName, if any parameter used with find documents suggest to use exec
  const duplicate = await Pod.findOne({ podName }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate podName" });
  }

  //user send users username i need to save them with theirId

  if (usersOfThePod.length > 4) {
    return res
      .status(400)
      .json({ message: "You can not share your pod with more than 4 people" });
  }

  // //convert list of usernames to list of their id's
  // const idOfTheUsersOfThePod = [];

  // for (let i = 0; i < usersOfThePod.length; i++) {
  //   const username = usersOfThePod[i];
  //   let foundUserFromCreatedPod = await User.findOne({ username });
  //   idOfTheUsersOfThePod.push(foundUserFromCreatedPod._id);
  // }

  let idOfTheUsersOfThePod = getIdsFromNameList(usersOfThePod);

  const podObject = {
    creatorId,
    podName,
    podFreeWeight,
    podTotalWeight: podTotalWeight ? podTotalWeight : 0,
    productRawAmount: productRawAmount ? productRawAmount : 0,
    //if req has no usersofthepad data then it is only creator, if it has then creeator+ data
    usersOfThePod: !usersOfThePod ? [creatorId] : idOfTheUsersOfThePod,
  };

  // Create and store new pod
  const pod = await Pod.create(podObject);

  if (pod) {
    //created
    console.log(pod + "created");
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
    userId,
    creatorId,
    podName,
    podFreeWeight,
    podTotalWeight,
    productRawAmount,
    usersOfThePod,
  } = req.body;

  return console.log(req.body);

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
  pod.usersOfThePod = !usersOfThePod
    ? [creatorId]
    : [creatorId, ...usersOfThePod];
  // user.active = active;

  const updatedPod = await pod.save();

  res.json({ message: `${updatedPod.podName} updated` });
});

// @desc Delete a pod
// @route DELETE /pods
// @access Private
const deletePod = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const userId = req.userId;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Pod ID Required" });
  }

  // Does the pod exist to delete?
  const pod = await Pod.findById(id).exec();

  if (!pod) {
    return res.status(400).json({ message: "Pod not found" });
  }

  if (userId !== pod.creatorId.toString()) {
    console.log(userId);
    console.log(pod.creatorId);
    return res.status(401).json({
      message: "You can not delete this pod. It does not belong to you",
    });
  }

  console.log(pod);

  const result = await pod.deleteOne();

  const reply = `Podname ${result.podname} with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllPods,
  getThePod,
  getPersonalPods,
  createNewPod,
  updatePod,
  deletePod,
};
