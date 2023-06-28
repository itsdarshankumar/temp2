const User = require("../schema/user");

class UserModel {
  constructor() {
    this.UserModel = User.getModel();
  }

  async registerUser(email, hashPassword) {
    try {
      const newUser = new this.UserModel({
        email: email,
        password: hashPassword,
      });
      const dataToSave = await newUser.save();
      return dataToSave;
    } catch (error) {
      return error;
    }
  }

  async fetchUserByEmail(email) {
    try {
      const result = await this.UserModel.findOne({ email: email });
      return result;
    } catch (error) {
      return error;
    }
  }
}

module.exports = UserModel;
