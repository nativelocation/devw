module.exports = (Schema) => {
    return new Schema({
        firstName: String,
        lastName: String,
        apiId:String,
        active: Boolean,//true = active, false = non-active
        type: Number,//1 = full-time, 2 = part-time
    });
};