const { Client } = require('pg')
require('dotenv').config()
const { POSTGRESS_CV_DB, POSTGRESS_CV_USER, POSTGRESS_CV_PASSWORD, POSTGRESS_CV_DATABASE, POSTGRESS_CV_HOST } = process.env;

let client;
if (POSTGRESS_CV_DB) client = new Client({ connectionString: POSTGRESS_CV_DB });
else {
    client = new Client({
        user: POSTGRESS_CV_USER,
        password: POSTGRESS_CV_PASSWORD,
        database: POSTGRESS_CV_DATABASE,
        host: POSTGRESS_CV_HOST,
        port: 5432,
        ssl: true
    })
}

module.exports = client;