const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { UserRoles } = require("../common/user-roles");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  name: { type: String, default: null, trim: true },
  phone_number: {
    type: String,
    unique: true,
    validate: (value) => {
      if (!validator.isMobilePhone(value, ["vi-VN"])) {
        throw new Error({ error: "Invalid phone number" });
      }
    },
  },
  role: {
    type: String,
    default: UserRoles.USER,
  },
  password: { type: String, minLength: 6 },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const user = this;
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.TOKEN_KEY, {
    expiresIn: "1y",
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (phone_number, password) => {
  const user = await User.findOne({ phone_number });

  if (!user) {
    return null;
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return null;
  }
  return user;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
