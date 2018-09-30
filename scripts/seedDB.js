const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/reactreadinglist"
);

const articleSeed = [
  {
    title: "The Happy Zone",
    date: new Date(Date.now()),
    link: "https://www.nytimes.com/"
  },
  {
    title: "The Lively Zone",
    date: new Date(Date.now()),
    link: "https://www.nytimes.com/"
  },
  {
    title: "The Smile Zone",
    date: new Date(Date.now()),
    link: "https://www.nytimes.com/"
  },
];

db.Article
  .remove({})
  .then(() => db.Article.collection.insertMany(articleSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
