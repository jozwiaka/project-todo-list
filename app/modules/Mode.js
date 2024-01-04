mongoose = require("mongoose");

const modeSchema = new mongoose.Schema({
    title: String,
    route: String
})
const Mode = mongoose.model("Mode", modeSchema);
module.exports = Mode;