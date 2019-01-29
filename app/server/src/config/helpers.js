const http = require('http');
const methods = {
    generalError: (err, res) => {
        const data = err.code ? undefined : err.message;
        const code = err.code || 500;
        return res.status(201).json({
            status: code,
            message: err.msg || "An error has ocurred, try again",
            data
        });
    },
    generalSuccess: (res, message, data) => {
        return res.status(201).json({
            status: 201,
            message,
            data
        });
    },
    initApp: async () => {
        try {
            const user = require('../models/user');
            const total = await user.getAll();
            if (total.length === 0) {
                user.create({
                    firstName: "Super",
                    lastName: "Admin",
                    email: "admin@devview.com",
                    role: 1,
                    password: '12345678'
                });
                console.log('User Admin Created: admin@devview.com:12345678');
            }
        } catch (e) {
            console.log('catch error initApp :', e);
        }

    },
    busboy: (callback, req) => {
        const Busboy = require('busboy');
        const midleware = new Busboy({ headers: req.headers });
        midleware.on('finish', () => {
            const merge = { ...req.body, ...req.files }
            callback(merge);
        });
        req.pipe(midleware);
    },
    keepsAwakeHeroku: (interval = 300000) => {
        require('dotenv').config();
        const { HEROKU_APP_NAME } = process.env;
        if (HEROKU_APP_NAME) {
            const url = `http://${HEROKU_APP_NAME}.herokuapp.com/`;
            console.log('Starting url and interval: ', url, interval);
            setInterval(() => http.get(url, null, e => console.log('called: ', url)), interval)
        } else console.log('Heroku APPNAME not found: ', HEROKU_APP_NAME);
    }
}

module.exports = methods;