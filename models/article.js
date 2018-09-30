const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  topic: { type: String, required: true },
  startYear: { type: Date, default: Date.now },
  endYear: { type: Date, default: Date.now },
  link: { type: String }
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
