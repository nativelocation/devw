require('dotenv').config()
const tw = require('teamwork-api')(process.env.TW_API, process.env.TW_SUB);
module.exports = tw