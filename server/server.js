const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const http = require("http");
require("dotenv").config();

// import i18n
const i18n = require("./src/i18n/i18n");

// set port
const port = process.env.PORT || 8080;

global.__basedir = `${__dirname}/`;

// create express application
const app = express();
const server = http.createServer(app);

// app configuration
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static("public"));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(i18n);
app.set("trust proxy", true);
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// cors setup
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// import routes
const indexRoute = require("./src/routes");

app.use("/", indexRoute);

// import db
const { connect } = require("./src/config/dbConnection");
connect();

//server listening to port
server.listen(port, () => {
  console.log(`Server listening on the port  ${port}`);
});

module.exports = { app: app };