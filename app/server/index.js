require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const busboy = require("connect-busboy");
const busboyBodyParser = require("busboy-body-parser");
const app = express();
const helpers = require('./src/config/helpers');
const alexaClearview = require('./src/alexa/clearview');

//Route Name
const projectRouter = require('./src/routes/project');
const userRouter = require('./src/routes/user');
const adminRouter = require('./src/routes/admin');
const devRouter = require('./src/routes/developer');


const port = process.env.PORT || 8000;
const publicPath = path.join(__dirname, "../../public");
// Middleware
app.use(busboy());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false }));
app.use(busboyBodyParser());
app.set("view engine", "ejs");

//Routes
app.use('/api/project', projectRouter);
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/developer', devRouter);

alexaClearview.init(app);
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
    data: process.env.DEBUG ? err : undefined
  });
});

helpers.initApp();

app.listen(port, _ => console.log(`The server is listening on port ${port}`));