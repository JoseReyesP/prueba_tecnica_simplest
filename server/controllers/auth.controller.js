const User = require("../models/user.model.js");

const create = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(200).json({ message: "Successfully signed up!" });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Error while creating new user: " + err });
  }
};

const list = async (req, res) => {
  try {
    let users = await User.find().select("name lastname email");
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        error: "User by Id: User not found",
      });
    }
    req.profile = user;
    next();
  } catch (error) {
    return res.status(400).json({
      error: "Could not retreive user",
    });
  }
};

const read = (req, res) => {
  try {
    const decyptedPassword = crypto
      .createHmac("sha1", req.profile.hashed_password)
      .update(req.profile.salt)
      .digest("hex");
    req.profile.decryptedPassword = decyptedPassword;
  } catch (error) {
    console.log(error);
  }

  return res.json(req.profile);
};

const update = async (req, res) => {
  try {
    let user = req.profile;
    req.body = { ...req.body, updated: Date.now() };
    await User.findByIdAndUpdate(user._id, { $set: req.body }, { new: true });
    res
      .status(200)
      .json({ message: "The profile has been updated successfully" });
  } catch (error) {
    return res.status(400).json({
      error: err.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    let user = req.profile;
    // there are 2 types of deletion, soft and hard, for now let's use hard deletion
  } catch (error) {}
};
