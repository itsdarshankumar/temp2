const URLModel = require("../models/shortUrl");

class UrlController {
  constructor(){
    this.UrlModel = new URLModel();
  }
  
  async dashboard(req, res) {
    const userId = req.user.objectID;
    try {
      const shortUrls = await this.UrlModel.getUrlByUserId(userId);
      res.render("index", { shortUrls: shortUrls });
    } catch (error) {
      console.error("Error fetching short URLs:", error);
      throw error;
    }
  }

  async addUrl(req, res) {
    const { fullUrl, note } = req.body;
    const userId = req.user.objectID;
    try {
      await this.UrlModel.addUrl(userId, fullUrl, note);
      res.redirect("/");
    } catch (error) {
      console.error("Error adding URL:", error);
      throw error;
    }
  }

  async increase(req, res) {
    const userId = req.user.objectID;
    try {
      const response = await this.UrlModel.increment(
        userId,
        req.params.shortUrl
      );
      res.redirect(response.full);
    } catch (error) {
      console.error("Error incrementing URL clicks:", error);
      throw error;
    }
  }
}

module.exports = UrlController;
