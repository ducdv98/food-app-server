const User = require("../model/user");

const register = async (req, res) => {
  try {
    const { name, phone_number, password } = req.body;

    if (!(name && phone_number && password)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ phone_number });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

const login = async (req, res) => {
  try {
    const { phone_number, password } = req.body;

    if (!(phone_number && password)) {
      res.status(400).send("All input is required");
    }

    const user = await User.findByCredentials(phone_number, password);
    if (!user) {
      return res
        .status(401)
        .send({ error: "Login failed! Check authentication credentials" });
    }
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

const currentUser = async (req, res) => {
  res.send(req.user);
};

const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};

const logoutAll = async (req, res) => {
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  register,
  login,
  currentUser,
  logout,
  logoutAll,
};
