require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }).then(() => console.log('DB is Connected')).catch(err => console.error(err));

const User = mongoose.model('User', require('./models/User')(Schema));
const Developer = mongoose.model('Developer', require('./models/Developer')(Schema));
const ClearviewAlexa = mongoose.model('ClearviewAlexa', require('./models/ClearviewAlexa')(Schema));

module.exports = { User, Developer, ClearviewAlexa };