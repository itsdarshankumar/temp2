const URLModel = require("../models/shortUrl");

class Search {
  constructor() {
    this.UrlModel = new URLModel();
  }
  async search(req, res) {
    const userId = req.user.objectID;
    const searchText = req.query.search;
    try {
      const results = await this.UrlModel.search(userId, searchText);
      res.render("index", { shortUrls: results });
    } catch (error) {
      throw error;
    }
  }
}
module.exports = Search;
