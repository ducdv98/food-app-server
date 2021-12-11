const User = require("../model/user");
const shortid = require("shortid");
const { UserRoles } = require("../common/user-roles");

const register = async (req, res) => {
  try {
    const { name, phone_number, password } = req.body;

    if (!(name && phone_number && password)) {
      return res.status(400).send({ error: "All fields is required" });
    }

    const oldUser = await User.findOne({ phone_number });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const user = new User({ ...req.body, role: UserRoles.USER, id: shortid.generate() });
    await user.save();
    const accessToken = await user.generateAuthToken();

    const userInfo = {
      phone_number: user.phone_number,
      name: user.name,
      id: user.id,
    };

    return res.status(201).send({ userInfo, accessToken });
  } catch (error) {
    res.status(400).send(error);
  }
};

const login = async (req, res) => {
  try {
    const { phone_number, password } = req.body;

    if (!(phone_number && password)) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const user = await User.findByCredentials(phone_number, password);
    if (!user) {
      return res
        .status(401)
        .send({ error: "Login failed! Check authentication credentials" });
    }

    const accessToken = await user.generateAuthToken();
    const userInfo = {
      phone_number: user.phone_number,
      name: user.name,
      id: user.id,
    }
    return res.send({ userInfo, accessToken });
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
    return res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};

const logoutAll = async (req, res) => {
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    return res.send();
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
