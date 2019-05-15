const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const mustache = require('mustache');
require('dotenv').config()
const { SMTP_ACCESS } = process.env;
//EXAMPLE: SMTP_ACCESS=smtps://emailaccount:emailpassword@smtp.gmail.com
const transporter = nodemailer.createTransport(SMTP_ACCESS);
const readHTMLFile = path => new Promise(res => fs.readFile(path, { encoding: 'utf-8' }, (err, html) => res(!err ? html : undefined)));

const methods = {
    SendEmail: async (data, templatename) => {
        const html = await readHTMLFile(path.join(__dirname, `/templates/${templatename}.html`));
        const htmlRendered = mustache.render(html, data);
        const to = data.to || 'admin@truekonnect.com, alexander.guzman@serpicodev.com';
        let mailOptions = {
            from: '"TrueKonnect Email Messages" <noreply@truekonnect.com>',
            to,
            subject: data.subject || 'No Subject',
            html: htmlRendered
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) return console.log(error);
            console.log('Message sent: ' + info.response);
        });
    },
}
module.exports = methods;