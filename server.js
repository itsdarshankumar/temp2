if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

class Server {
  constructor() {
    this.app = express();
    this.mongoString = process.env.DATABASE_URI;

    this.setupDatabase();
    this.setupMiddleware();
    this.setupRoutes();
  }

  setupDatabase() {
    mongoose.connect(this.mongoString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const database = mongoose.connection;

    database.on("error", (error) => {
      console.log(error);
    });

    database.once("connected", () => {
      console.log("Database Connected");
    });
  }

  setupMiddleware() {
    this.app.set("view engine", "ejs");
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  setupRoutes() {
    const loginRouter = require("./server/router/login");
    const registerRouter = require("./server/router/register");
    const logoutRouter = require("./server/router/logout");
    const dashboardRouter = require("./server/router/dashboard");
    const searchRouter = require("./server/router/search");

    this.app.use("/login", loginRouter);
    this.app.use("/register", registerRouter);
    this.app.use("/logout", logoutRouter);
    this.app.use("/", dashboardRouter);
    this.app.use("/search", searchRouter);
  }

  start() {
    const port = process.env.PORT || 4000;
    this.app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }
}

const server = new Server();
server.start();
