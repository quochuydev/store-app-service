const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: { type: String, null: true },
  body: { type: String, null: true },
  tags: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

const blogModel = mongoose.model("Blog", BlogSchema);

module.exports = { blogModel };
