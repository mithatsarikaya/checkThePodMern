const User = require("../models/Users");
const bcrypt = require("bcrypt");

// @desc Login
// @route POST /auth
// @access Public

const login = (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
};
