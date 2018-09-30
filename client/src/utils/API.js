import axios from "axios";
const nyTimesURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
const nyTimesAPIKEY = "api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
const topic = "&q"

export default {
  // Gets all books
  getArticles: function(string) {
    return axios.get(`${nyTimesURL}${nyTimesAPIKEY}${topic}`);
  },
  // Gets the book with the given id
  getArticle: function(id) {
    return axios.get("/api/article/" + id);
  },
  // Deletes the book with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/article/" + id);
  },
  // Saves a book to the database
  saveArticle: function(articleData) {
    return axios.post("/api/article", articleData);
  }
};
