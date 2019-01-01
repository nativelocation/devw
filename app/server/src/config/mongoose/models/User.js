module.exports = (Schema) => {
    return new Schema({
        name: String,
        role: Number,
        email: String,
        password: String,
        title: String,
        phoneNumber: String,
        address: String,
        idProject: Number
    });
};