module.exports.info = (message) => {
    const prefix = "\n[Info]: ";
    console.log(prefix + message);
}
module.exports.error = (message) => {
    const prefix = "\n[Error]: ";
    console.log(prefix + message);
}

module.exports.valid = (x) => {
    if (typeof x !== "undefined" && x !== null && x !== "" && x !== [] && x !== 0) {
        return true;
    } else {
        return false;
    }
}

module.exports.prefixId = (id) => {
    return "id-" + id;
}

module.exports.parseId = (id) => {
    return String(id).replace(/id-/g, "").replace(/,/g, "");
}
