const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class LoginController {
  constructor() {
    this.userModel = new UserModel();
  }

  getLoginPage(req, res) {
    res.render("login.ejs");
  }

  async submitLogin(req, res) {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }

    try {
      const user = await this.userModel.fetchUserByEmail(email);
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = await jwt.sign(
          { email: user.email, objectID: user._id },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );

        res.cookie("token", token, {
          maxAge: 2 * 60 * 60 * 1000,
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });

        res.redirect("/");
      } else {
        res.status(400).send("Invalid Credentials");
      }
    } catch (error) {
      console.error("Error submitting login:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = LoginController;
