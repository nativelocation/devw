const tw = require('../config/teamwork');

const model = {
    getProjects: async () => {
        return await tw.projects.get({status: "ALL"});
    },
    getPeople: async () => {
        return await tw.people.get({
            page: 1,
            pageSize: 50
        })
    }
}

module.exports = model;