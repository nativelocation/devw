const db = require('../config/mongoose');
const database = {
    create: async data => {
        const { name, userId, comments } = data;
        const values = { name, userId, comments };
        const item = new db.Document(values);
        return await item.save();
    },
    update: async (id, data) => {
        const document = await db.Document.findByIdAndUpdate({_id: id}, data);
        return await db.Document.findById(document._id);
    },
    delete: async id => {
        return await db.Document.findByIdAndRemove(id);
    },
    getById: async id => {
        return await db.Document.findById(id);
    },
    getAll: async () => {
        console.log(await db.Document.find());
        return await db.Document.find();
    }
}

module.exports = database;