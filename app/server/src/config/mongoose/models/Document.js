module.exports = (Schema) => {
    return new Schema({
        name: String,
        userId: String,
        comments: String,
    });
};