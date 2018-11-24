const db = require('../config/mongoose');
const database = {
    create: async data => {
        const { name } = data;
        const values = { name };
        const item = new db.Team(values);
        return await item.save();
    },
    update: async (data) => {
        const { name } = data;
        const values = { name };

        // const team = await db.Team.findByIdAndUpdate({ _id: data._id }, values);
        const team = await db.Team.findByIdAndUpdate({_id: data._id}, values);
        console.log('database ',team)
        // const team = await db.Team.findById(data._id);
        // return await db.Team.findById(team._id);
    },
    delete: async id => {
        return await db.Team.findByIdAndRemove(id);
    },
    getById: async id => {
        return await db.Team.findById(id);
    },
    getAll: async () => {
        return await db.Team.find();
    }
}

module.exports = database;