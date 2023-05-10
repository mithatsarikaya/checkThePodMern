const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const verifyJwt = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  console.log("this is from verifyJWT middleware" + token);
};

module.exports = { verifyJwt };
