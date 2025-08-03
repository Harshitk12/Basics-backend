const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  body: String
});

module.exports = mongoose.model("Card", cardSchema);





