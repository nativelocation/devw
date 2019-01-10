const { Client } = require('pg')
require('dotenv').config()
const connectionString = process.env.POSTGRESS_CV_DB;

//Test Local //TODO: find a correct way to manage this
const client = new Client({
    user: "zimmdycoobkwwv",
    password: "21e2e1743ed88be9369ca572ea8cace4eaadfcd0114f35cf307e1f14bb6d695a",
    database: "d7ef7sb3bip61i",
    port: 5432,
    host: "ec2-54-225-100-12.compute-1.amazonaws.com",
    ssl: true
})

// const client = new Client({ connectionString });
module.exports = client;