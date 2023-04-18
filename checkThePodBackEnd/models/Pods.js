const mongoose = require("mongoose");

const podSchema = new mongoose.Schema(
  {
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    usersOfThePod: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    podName: {
      type: String,
      required: true,
    },
    podFreeWeight: {
      type: Number,
      required: true,
      min: 0,
    },

    podTotalWeight: {
      type: Number,
    },
    productRawAmount: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pod", podSchema);
