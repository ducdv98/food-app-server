const jwt = require("jsonwebtoken");
const User = require("../model/user");

const config = process.env;

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, config.TOKEN_KEY);
    const user = await User.findOne({ id: data.id, "tokens.token": token });
    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};

module.exports = verifyToken;
