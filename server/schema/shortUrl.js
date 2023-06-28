const mongoose = require("mongoose");
const shortid = require("shortid");

class URL {
  static getSchema() {
    return new mongoose.Schema({
      full: {
        type: String,
        required: true,
      },
      short: {
        type: String,
        required: true,
        default: shortid.generate,
      },
      clicks: {
        type: Number,
        required: true,
        default: 0,
      },
      note: {
        type: String,
        required: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    });
  }

  static getModel() {
    if (!URL._model) {
      URL._model = mongoose.model("Url", URL.getSchema());
    }
    return URL._model;
  }
}

module.exports = URL;
