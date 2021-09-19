const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, null: true },
  email: { type: String, unique: true },
  phoneNumber: { type: String, null: true },
  dateOfBirth: { type: Date, null: true },
  googleId: { type: String, null: true },
  facebookId: { type: String, null: true },
  instagramId: { type: String, null: true },
  instagramUsername: { type: String, null: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, null: true },
});

const userModel = mongoose.model("User", UserSchema);

module.exports = { userModel };
