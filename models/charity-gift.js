const mongoose = require("mongoose");

const CharityGiftSchema = new mongoose.Schema({
  name: { type: String, null: true },
  phoneNumber: { type: String, null: true },
  address: { type: String, null: true },
  campain: { type: String, null: true },
  createdAt: { type: Date, default: Date.now },
});

const charityGiftModel = mongoose.model("CharityGift", CharityGiftSchema);

module.exports = { charityGiftModel };
