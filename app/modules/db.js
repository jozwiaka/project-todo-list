const { default: mongoose } = require("mongoose");
const utils = require(__dirname + "/utils.js");

module.exports.connect = function (uri) {
    // mongoose.connect(uri);
    mongoose.connect(uri, {
        user: "jozwiaka",
        pass: "password"
    });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        utils.info("Connected to database");
    });
}

module.exports.disconnect = function () {
    mongoose.connection.close();
    utils.info("Connection closed");
}