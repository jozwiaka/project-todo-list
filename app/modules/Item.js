const mongoose = require("mongoose");
const Mode = require(__dirname + "/Mode.js")

const itemSchema = new mongoose.Schema({
    name: String,
    mode: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mode'
    },
    checked: {
        type: Boolean,
        default: false
    }
});

const Item = mongoose.model("Item", itemSchema); //Item -> dbItems
module.exports = Item;