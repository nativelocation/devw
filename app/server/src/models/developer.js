const developer = require('../database/developer');

const model = {
    create: async data => {
        if (!data) throw { code: 400, msg: "Data is required" };
        if (!data.apiId) throw { code: 400, msg: "API ID is required" };
        
        //const existDeveloper = await developer.getByEmail(data.apiId);
        //if (existDeveloper) throw { code: 400, msg: "The developer already exists" };

        return await developer.create(data);
    },
    update: async data => {
        if (!data) throw { code: 400, msg: "Data is required" };
        if (!data.apiId) throw { code: 400, msg: "API ID is required" };

        return await developer.update(data.apiId, data);
    },
    delete: async data => {
        if (!data) throw { code: 400, msg: "Params is empty" };
        if (!data.apiId) throw { code: 400, msg: "ID is required" };
        return await developer.delete(data.apiId);
    },
    getAll: async () => {
        return await developer.getAll();
    },
    getDeveloperByApiId: async data => {
        if (!data) throw { code: 400, msg: "Data is empty" };
        if (!data.apiId) throw { code: 400, msg: "ID is required" };
        return await developer.getByApiId(data.apiId);
    },
}

module.exports = model;