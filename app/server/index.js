require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const busboy = require('connect-busboy');
const busboyBodyParser = require('busboy-body-parser');
const app = express();

//Route Name
// const dashboardRouter = require('./src/routes/index');

const port = process.env.PORT || 8000;
const publicPath = path.join(__dirname, '../../public');
// Middleware
app.use(busboy());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false }));
app.use(busboyBodyParser());

//Routes
// app.use('/dashboard', dashboardRouter);
app.listen(port, _ => console.log(`The server is listening on port ${port}`));