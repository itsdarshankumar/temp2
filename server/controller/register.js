const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const UserModel = require("../models/user");

class UserController {
  constructor() {
    this.userModel = new UserModel();
  }

  registerPage(req, res) {
    res.render("register.ejs");
  }

  async register(req, res) {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }

    try {
      const oldUser = await this.userModel.fetchUserByEmail(email);
      if (oldUser) {
        return res.status(409).send("User Already Exists. Please Login");
      }

      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await this.userModel.registerUser(email, hashPassword);

      if (newUser) {
        res.redirect("/login");
      } else {
        res.status(400).send("Some error occurred");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = UserController;
