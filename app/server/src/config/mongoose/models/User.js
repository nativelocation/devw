module.exports = (Schema) => {
    return new Schema({
        firstName: String,
        lastName: String,
        role: Number,//1 = Super Admin, 2 = Admin
        email: String,
        password: String,
    });
};