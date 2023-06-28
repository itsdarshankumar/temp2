const jwt = require("jsonwebtoken");
require("dotenv").config();

class JwtMiddleware {
  static verifyToken(req, res, next) {
    const token =
      req.body.token ||
      req.query.token ||
      req.headers["x-access-token"] ||
      req.cookies.token;

    if (!token) {
      return res.redirect("/login");
    }

    try {
      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      req.user = decoded;
    } catch (err) {
      return res.redirect("/login");
    }

    return next();
  }
}

module.exports = JwtMiddleware;
