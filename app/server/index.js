require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const busboy = require("connect-busboy");
const busboyBodyParser = require("busboy-body-parser");
const app = express();

//Route Name
// const dashboardRouter = require('./src/routes/index');

const port = process.env.PORT || 8000;
const publicPath = path.join(__dirname, "../../public");
// Middleware
app.use(busboy());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false }));
app.use(busboyBodyParser());

//Routes
// app.use('/dashboard', dashboardRouter);

app.get("*", (req, res, next) => {
  if (req.url.includes("api")) return next();
  res.sendFile(path.resolve(publicPath, "index.html"));
});

app.use((req, res, next) => {
  next(createError(404));
});
app.use((err, req, res, next) => {
  console.log("err.status :", err.status);
  res.status(err.status || 500).json({
    message: "An error has ocurred.",
    data: req.app.get("env") === "development" ? err : null
  });
});

const tw = require("teamwork-api")(
  "twp_GyX8Zgke05Wd4hHigpr6BN32ckvp",
  "serpicodev.teamwork.com"
);

tw.projects
  .get({
    status: "ALL"
  })
  .then(res => {
    console.log("Projects ", res);
    this.setState({ projects: res });
  })
  .catch(err => {
    console.log("Error ", err);
  });

app.listen(port, _ => console.log(`The server is listening on port ${port}`));
