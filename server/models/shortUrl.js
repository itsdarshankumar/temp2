const Url = require("../schema/shortUrl");
const mongoose = require("mongoose");

class URLModel {
  constructor() {
    this.URLModel = Url.getModel();
  }
  async getUrlByUserId(userId) {
    try {
      const urls = await this.URLModel.find({
        user: new mongoose.Types.ObjectId(userId),
      }).exec();
      return urls;
    } catch (error) {
      console.error("Error fetching URLs:", error);
      throw error;
    }
  }

  async addUrl(userId, url, note) {
    try {
      await this.URLModel.create({
        full: url,
        user: new mongoose.Types.ObjectId(userId),
        note: note,
      });
    } catch (error) {
      console.log("Error while adding URL:", error);
      throw error;
    }
  }

  async increment(userId, url) {
    try {
      const response = await this.URLModel.findOne({
        short: url,
        user: new mongoose.Types.ObjectId(userId),
      });
      if (response) {
        response.clicks++;
        response.save();
      }
      return response;
    } catch (error) {
      console.log("Error while incrementing URL clicks:", error);
      throw error;
    }
  }

  async search(userId, search) {
    try {
      const searchRegex = new RegExp(search, "i");
      const results = await this.URLModel.find({
        $and: [
          { user: new mongoose.Types.ObjectId(userId) },
          { $or: [{ full: searchRegex }, { note: searchRegex }] },
        ],
      });

      return results;
    } catch (error) {
      console.error("Error searching URLs:", error);
      return null;
    }
  }
}

module.exports = URLModel;
