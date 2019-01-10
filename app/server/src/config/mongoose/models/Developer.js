module.exports = (Schema) => {
    return new Schema({
        apiId:String,
        active: Boolean,//true = active, false = non-active
        fullTime: Boolean,//true = full-time, false = part-time
    });
};