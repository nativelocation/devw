require('dotenv').config()
const tw = require('teamwork-api')(process.env.TW_API, process.env.TW_SUB);

const methods = {
    getProjects: async () => {
        await tw.projects.get({status: "ALL"}).then(res => {
            console.log(res);
            // return res;
          })
          .catch(err => {
            console.log("Error ", err);
          })
    }
}

module.exports = methods