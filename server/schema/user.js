const mongoose = require("mongoose");

class User {
  static getSchema() {
    return new mongoose.Schema({
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
    });
  }

  static getModel() {
    if (!User._model) {
      User._model = mongoose.model("User", User.getSchema());
    }
    return User._model;
  }
}

module.exports = User;
