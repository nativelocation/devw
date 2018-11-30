module.exports = (Schema) => {
    return new Schema({
        name: String,
        email: String,
        password: String,
        teamId: String,
        phone: String,
        type: Number,
        image: String,
        verificationCode: String,
    });
};