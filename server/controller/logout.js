class LogoutController {
  static logout(req, res) {
    res.clearCookie("token");
    res.redirect("/login");
  }
}

module.exports = LogoutController;
