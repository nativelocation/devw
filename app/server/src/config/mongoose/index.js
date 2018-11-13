require('dotenv').config()
const mongoose = require('mongoose');
const { Schema } = mongoose;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }).then(() => console.log('DB is Connected')).catch(err => console.error(err));

const User = mongoose.model('User', require('./models/User')(Schema));
const Document = mongoose.model('Document', require('./models/Document')(Schema));
const Team = mongoose.model('Team', require('./models/Team')(Schema));

module.exports = { User, Document, Team };