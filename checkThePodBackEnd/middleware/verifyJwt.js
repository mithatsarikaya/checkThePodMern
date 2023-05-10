const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const verifyJwt = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  if (!token)
    return res.status(401).res.json({ message: "You are not authorized" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).res.json({
        message:
          "There is a problem about your token, talk to nuuklu about it or maybe i should automate this shit lol",
      });
    } else {
      req.userId = decodedToken.UserInfo.id;
      next();
    }
  });
};

module.exports = { verifyJwt };
