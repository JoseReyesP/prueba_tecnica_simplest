const mongoose = require("mongoose");
const { mongo } = mongoose;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is require",
  },
  lastname: {
    type: String,
    trim: true,
    required: "Lastname is required",
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
    validate: {
      validator: async function (value) {
        const user = await mongoose.model("User").findOne({ email: value });
        return !user;
      },
      message: "Email address must be unique",
    },
  },
});

UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {
      return error;
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};
